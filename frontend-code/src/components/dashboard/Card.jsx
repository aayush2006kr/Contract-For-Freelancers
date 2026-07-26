import { FileText } from "lucide-react";

const Card = ({ title, value, subtitle, icon: Icon = FileText }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between min-h-[140px]">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          {title}
        </span>

        <Icon size={22} className="text-neutral-500" />
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-white">{value}</h2>

        <p className="text-sm text-neutral-400 mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default Card;