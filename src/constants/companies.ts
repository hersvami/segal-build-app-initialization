/* ─── Segal Build — Company Configurations ─── */
import type { Company } from '../types/domain';

export const COMPANIES: Company[] = [
  {
    id: 'segal-build',
    name: 'Segal Build Pty Ltd',
    abn: '83 671 632 230',
    licence: 'DB-L 12345 (VBA)',
    phone: '0416 460 164',
    email: 'james@thesegals.com.au',
    logoUrl:
      'https://raw.githubusercontent.com/hersvami/segal-build-app/main/public/logos/segal-build.png',
    defaultOverheadPercent: 12,
    defaultProfitPercent: 15,
  },
  {
    id: 'segval',
    name: 'Segval',
    abn: '22 334 455 667',
    licence: '',
    phone: '0416 460 164',
    email: 'info@segval.com.au',
    logoUrl:
      'https://raw.githubusercontent.com/hersvami/segal-build-app/main/public/logos/segval.png',
    defaultOverheadPercent: 12,
    defaultProfitPercent: 15,
  },
];

export const getCompanyById = (id: string): Company =>
  COMPANIES.find(c => c.id === id) || COMPANIES[0];
