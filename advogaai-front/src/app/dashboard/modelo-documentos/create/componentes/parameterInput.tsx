import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

export type Parameter = {
  id: number;
  text: string;
  color: 'blue' | 'red' | 'green';
};

interface ParameterInputProps {
  parametros: Parameter[];
  setParametros: React.Dispatch<React.SetStateAction<Parameter[]>>;
}

function ParameterPill({
  parameter,
  onRemove,
}: {
  parameter: Parameter;
  onRemove: () => void;
}) {
  const colorClasses = {
    blue: 'border-blue-400 text-blue-400',
    red: 'border-red-500 text-red-500',
    green: 'border-green-500 text-green-500',
  };

  return (
    <div
      className={`flex h-8 shrink-0 cursor-default items-center gap-1.5 rounded-full border-2 ${colorClasses[parameter.color]} bg-transparent px-3 py-1 text-sm font-semibold`}
    >
      <span>{parameter.text}</span>
      <button
        onClick={onRemove}
        className="-mr-1 cursor-pointer rounded-full p-0.5 transition-colors hover:bg-white/10"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function ParameterInput({
  parametros,
  setParametros,
}: ParameterInputProps) {
  const handleRemove = (idToRemove: number) => {
    setParametros((prev) => prev.filter((p) => p.id !== idToRemove));
  };

  const handleAdd = () => {
    console.log(
      'TODO: Lógica para abrir modal/dropdown para adicionar parâmetros',
    );
  };

  return (
    <div className="grid w-full items-center gap-2">
      <Label className="font-bold">Parâmetros de Preenchimento</Label>
      <div className="relative w-full rounded-lg border border-input bg-[#ebebeb]">
        <div className="flex min-h-[100px] flex-wrap items-center gap-2 p-3 pr-12">
          {parametros.map((param) => (
            <ParameterPill
              key={param.id}
              parameter={param}
              onRemove={() => handleRemove(param.id)}
            />
          ))}
        </div>
        <button
          onClick={handleAdd}
          className="absolute bottom-2 cursor-pointer right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-400 hover:text-gray-700"
          aria-label="Adicionar parâmetro"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}
