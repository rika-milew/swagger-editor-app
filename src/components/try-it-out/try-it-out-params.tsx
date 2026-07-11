import { ParametersSection } from './parameters-section';
import type { SwaggerParameter } from '@/types/viewer.types';

type TryItOutParamsProps = {
  parameters: SwaggerParameter[];
  paramValues: Record<string, string>;
  onParamChange: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const PARAMETERS_TITLES = [
  { title: 'Path Parameters', in: 'path' as const },
  { title: 'Query Parameters', in: 'query' as const },
  { title: 'Header Parameters', in: 'header' as const },
  { title: 'Cookie Parameters', in: 'cookie' as const },
];

export function TryItOutParams({
  parameters,
  paramValues,
  onParamChange,
}: TryItOutParamsProps) {
  return (
    <>
      {PARAMETERS_TITLES.map(({ title, in: location }) => (
        <ParametersSection
          key={location}
          title={title}
          parameters={parameters.filter((p) => p.in === location)}
          paramValues={paramValues}
          onParamChange={onParamChange}
        />
      ))}
    </>
  );
}
