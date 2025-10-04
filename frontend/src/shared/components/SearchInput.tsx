interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-8 max-w-lg mx-auto">
      <input
        type="text"
        placeholder={placeholder || "Пошук..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};
