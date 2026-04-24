import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Company, Project, Variation } from '../types/domain';
import { formatCurrency } from './helpers';
import { PHASE_LABELS, PHASE_ORDER } from '../components/variationBuilder/phaseGrouping';

export function generateQuotePDF(variation: Variation, project: Project, company: Company): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const docLabel = variation.documentType === 'quote' ? 'QUOTATION' : 'VARIATION';

  // Company letterhead
  doc.setFillColor(41, 98, 255);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(company.name, 14, 16);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`ABN: ${company.abn}`, 14, 22);

  // Document title
  doc.setTextColor(41, 98, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(docLabel, pageWidth - 14, 16, { align: 'right' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  if (variation.variationNumber) {
    doc.text(`No: ${variation.variationNumber}`, pageWidth - 14, 22, { align: 'right' });
  }

  // Project & Customer details
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Project Details', 14, 35);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Project: ${project.name}`, 14, 41);
  doc.text(`Address: ${project.address}`, 14, 46);
  doc.text(`Customer: ${project.customer.name}`, 14, 51);
  doc.text(`Email: ${project.customer.email}`, 14, 56);
  if (project.customer.phone) {
    doc.text(`Phone: ${project.customer.phone}`, 14, 61);
  }

  // Date & Status
  doc.text(`Date: ${new Date(variation.createdAt).toLocaleDateString('en-AU')}`, pageWidth - 14, 41, { align: 'right' });
  doc.text(`Status: ${variation.status.toUpperCase()}`, pageWidth - 14, 46, { align: 'right' });

  // Description / Scope summary
  let yPos = 70;
  if (variation.description) {
    doc.setFont('helvetica', 'bold');
    doc.text('Scope Summary', 14, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 5;
    const descLines = doc.splitTextToSize(variation.description, pageWidth - 28);
    doc.text(descLines, 14, yPos);
    yPos += descLines.length * 5 + 8;
  }

  // Phase Grouped BoQ
  const allStages = variation.scopes.flatMap((s) => s.stages || []);
  const allParametric = variation.scopes.flatMap((s) => s.parametricItems || []);
  const phaseGroups: Record<string, Array<{ label: string; trade: string; cost: number }>> = {};

  for (const phase of PHASE_ORDER) {
    phaseGroups[phase] = [];
  }

  for (const stage of allStages) {
    const phase = inferPhaseFromStage(stage);
    phaseGroups[phase].push({ label: stage.name, trade: stage.trade, cost: stage.cost });
  }

  for (const item of allParametric) {
    const phase = inferPhaseFromParametric(item);
    phaseGroups[phase].push({ label: item.label, trade: item.unit, cost: item.rate * item.quantity });
  }

  for (const phase of PHASE_ORDER) {
    if (phaseGroups[phase].length === 0) continue;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(41, 98, 255);
    doc.text(PHASE_LABELS[phase], 14, yPos);
    yPos += 2;

    autoTable(doc, {
      startY: yPos,
      head: [['Item', 'Trade', 'Cost']],
      body: phaseGroups[phase].map((item) => [item.label, item.trade, formatCurrency(item.cost)]),
      theme: 'plain',
      headStyles: { fillColor: [240, 240, 240], textColor: [80, 80, 80], fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 1.5 },
      margin: { left: 14, right: 14 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 8;
  }

  // Pricing Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(41, 98, 255);
  doc.text('Pricing Summary', 14, yPos);
  yPos += 6;

  const pricingRows = [
    ['Trade Cost', formatCurrency(variation.pricing.tradeCost)],
    [`Overhead (${variation.pricing.overheadPercent}%)`, formatCurrency(variation.pricing.overhead)],
    [`Profit (${variation.pricing.profitPercent}%)`, formatCurrency(variation.pricing.profit)],
    [`Contingency (${variation.pricing.contingencyPercent}%)`, formatCurrency(variation.pricing.contingency)],
    ['Subtotal (excl. GST)', formatCurrency(variation.pricing.subtotalExclGst)],
    ['GST (10%)', formatCurrency(variation.pricing.gst)],
  ];

  autoTable(doc, {
    startY: yPos,
    body: pricingRows,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 2 },
    margin: { left: 14, right: 14 },
    columnStyles: { 1: { fontStyle: 'bold', halign: 'right' } },
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;

  // Total
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(41, 98, 255);
  doc.text(`Total (incl. GST): ${formatCurrency(variation.pricing.total)}`, pageWidth - 14, yPos, { align: 'right' });

  // T&Cs Footer
  yPos = pageWidth > 200 ? 250 : 270;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('Terms & Conditions:', 14, yPos);
  yPos += 4;
  const tcLines = doc.splitTextToSize(
    'This quotation is valid for 30 days. All work to be completed in accordance with VBA standards and NCC requirements. Progress payments required as per contract. Prices subject to change if site conditions vary from scope.',
    pageWidth - 28,
  );
  doc.text(tcLines, 14, yPos);

  // Company footer
  yPos = pageWidth > 200 ? 280 : 290;
  doc.setFontSize(9);
  doc.setTextColor(41, 98, 255);
  doc.text(`${company.name} | ${company.phone} | ${company.email}`, pageWidth / 2, yPos, { align: 'center' });

  return doc;
}

function inferPhaseFromStage(stage: { name: string; trade: string }): string {
  const text = `${stage.name} ${stage.trade}`.toLowerCase();
  if (['demo', 'remove', 'strip', 'prep'].some((t) => text.includes(t))) return 'preparation';
  if (['plumbing', 'electrical', 'hvac'].some((t) => text.includes(t))) return 'services';
  if (['tiling', 'painting', 'waterproofing', 'flooring'].some((t) => text.includes(t))) return 'finishes';
  return 'structure';
}

function inferPhaseFromParametric(item: { label: string; unit: string; phase?: string }): string {
  if (item.phase) return item.phase;
  const text = `${item.label} ${item.unit}`.toLowerCase();
  if (['prep', 'remove', 'demo'].some((t) => text.includes(t))) return 'preparation';
  if (['point', 'circuit', 'pipe', 'duct'].some((t) => text.includes(t))) return 'services';
  if (['tile', 'paint', 'floor', 'waterproof'].some((t) => text.includes(t))) return 'finishes';
  return 'structure';
}
