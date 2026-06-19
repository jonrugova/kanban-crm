import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <h1 className="header-title">Guhr Steuerberatung</h1>
        <div className="header-divider" />
        <span className="header-subtitle">Client Onboarding</span>
      </div>
      <div className="header-user">
        <div className="avatar">
          <span>SB</span>
        </div>
      </div>
    </header>
  );
}
