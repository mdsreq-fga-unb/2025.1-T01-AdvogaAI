import { Label } from '@/components/ui/label';

export type Parameter = {
  id: number;
  nome: string;
  chave: string;
  color: 'blue' | 'red' | 'green';
};

interface ParameterInputProps {
  parametros: Parameter[];
}

function ParameterPill({ parameter }: { parameter: Parameter }) {
  const colorClasses = {
    blue: 'border-blue-400 text-blue-400',
    red: 'border-red-500 text-red-500',
    green: 'border-green-500 text-green-500',
  };

  return (
    <div
      className={`flex h-8 shrink-0 cursor-default items-center gap-1.5 rounded-full border-2 ${colorClasses[parameter.color]} bg-transparent px-3 py-1 text-sm font-semibold`}
    >
      <span>
        {parameter.nome} - {parameter.chave}
      </span>
    </div>
  );
}

export function ParameterInput({ parametros }: ParameterInputProps) {
  return (
    <div className="grid w-full items-center gap-2">
      <Label className="font-bold">Parâmetros de Preenchimento</Label>
      <div className="relative w-full rounded-lg border border-input bg-[#ebebeb]">
        <div className="flex min-h-[100px] flex-wrap items-start gap-2 p-3 pr-12">
          {parametros.map((param) => (
            <ParameterPill key={param.id} parameter={param} />
          ))}
          {parametros.length < 1 && (
            <Label className="text-black opacity-60">
              Faça upload de um docx com tags para lista-las aqui
            </Label>
          )}
        </div>
      </div>
    </div>
  );
}
