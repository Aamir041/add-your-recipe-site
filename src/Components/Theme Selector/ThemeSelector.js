import useTheme from "../../hooks/useTheme";
import modeIcon from "../../assets/mode-icon.svg";
import "./ThemeSelector.css";

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();
  const themeColors = [`#58429c`, `#249c6b`, `#b70233`];
  
  const toggelMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark');
  }

   console.log(mode);

  return (
    <div className="theme-selector">

      <div className="mode-toggle">
        <img 
        src={modeIcon}
        onClick={toggelMode}
        alt="mode icon"
        style={{filter: mode ==='dark'? 'invert(100%)' : 'invert(20%)'}}
        />
      </div>

      <div className="theme-buttons">
        <h3 className={`theme-indicator ${mode}`}>Color 👉</h3>
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
