type Props<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

export function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <fieldset>
      <legend>{label}</legend>
      {options.map((option) => (
        <button
          type="button"
          aria-pressed={value === option}
          className={value === option ? "selected" : ""}
          onClick={() => onChange(option)}
          key={option}
        >
          {option}
        </button>
      ))}
    </fieldset>
  );
}
