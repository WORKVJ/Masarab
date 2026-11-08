import type { Category } from '@/lib/masarContent';
import { DIVISION_THEMES, themeColors } from '@/lib/divisionThemes';
import CoolingShowcase from './showcases/CoolingShowcase';
import WaterShowcase from './showcases/WaterShowcase';
import ChemicalShowcase from './showcases/ChemicalShowcase';
import ElectricalShowcase from './showcases/ElectricalShowcase';
import InstrumentationShowcase from './showcases/InstrumentationShowcase';
import MechanicalShowcase from './showcases/MechanicalShowcase';
import PipeShowcase from './showcases/PipeShowcase';
import SafetyShowcase from './showcases/SafetyShowcase';

/**
 * Each division presents its products in its own layout:
 * cooling → icy bento gallery · water → purification flow · chemical → periodic table ·
 * electrical → switchgear panel · instrumentation → gauge dashboard · mechanical → blueprint sheets ·
 * pipe fittings → steel catalogue · safety → searchable PPE catalogue.
 */
export default function DivisionShowcase({ category }: { category: Category }) {
  switch (category.id) {
    case 'cooling':
      return <CoolingShowcase category={category} />;
    case 'water':
      return <WaterShowcase category={category} />;
    case 'chemical':
      return <ChemicalShowcase category={category} />;
    case 'electrical':
      return <ElectricalShowcase category={category} />;
    case 'instrumentation':
      return <InstrumentationShowcase category={category} />;
    case 'mechanical':
      return <MechanicalShowcase category={category} />;
    case 'pipe-fittings':
      return <PipeShowcase category={category} />;
    case 'safety':
      return <SafetyShowcase products={category.products} colors={themeColors(DIVISION_THEMES.safety)!} />;
    default:
      return null;
  }
}
