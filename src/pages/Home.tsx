import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AppWindow,
  Code2,
  Command,
  Github,
  Instagram,
  Globe2,
  Layers3,
  Linkedin,
  Menu,
  Monitor,
  MoveUpRight,
  Server,
  X,
} from "lucide-react";

const navigation = [
  { label: "VM Guave", href: "#projeto-principal" },
  { label: "Projetos", href: "#projetos" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Formação", href: "#formacao" },
];

const skills = [
  {
    title: "Apps nativos",
    icon: AppWindow,
    items: ["Swift", "SwiftUI", "AppKit", "Rust", "Tauri"],
  },
  {
    title: "Web",
    icon: Globe2,
    items: ["TypeScript", "JavaScript", "React", "Next.js", "HTML5", "CSS3", "PWA"],
  },
  {
    title: "Back-end e dados",
    icon: Server,
    items: ["Python", "Node.js", "APIs REST", "Prisma", "Supabase", "SQL"],
  },
  {
    title: "Infra e entrega",
    icon: Layers3,
    items: ["Git", "GitHub Actions", "Virtualização", "QEMU", "Shell", "Assinatura de apps"],
  },
];

const projects = [
  {
    number: "02",
    title: "W-AZAP",
    category: "Comunicação · Automação",
    description:
      "Gateway e painel de WhatsApp com várias sessões, API REST, webhooks e automação. Interface em 14 idiomas, CI e CodeQL.",
    tags: ["Next.js", "React", "TypeScript", "Prisma", "Baileys"],
    action: "Ver no GitHub",
    href: "https://github.com/marloon-dev/w-azap",
  },
  {
    number: "03",
    title: "Shift Control",
    category: "Produtividade · PWA",
    description:
      "PWA de escala, trabalho extra e previsão do recibo, usado por colegas de trabalho. Substituiu um app AppSheet.",
    tags: ["TypeScript", "PWA", "Supabase"],
    action: "Repositório privado",
    href: undefined,
  },
  {
    number: "04",
    title: "MacReader",
    category: "Leitura · Multiplataforma",
    description: "Leitor de livros digitais para Android, iPhone e macOS.",
    tags: ["JavaScript", "Multiplataforma"],
    action: "Ver no GitHub",
    href: "https://github.com/marloon-dev/MacReader",
  },
  {
    number: "05",
    title: "Projeto Cordel",
    category: "Web · Experimento",
    description:
      '“Cordel Moderno”, de Milton Duarte, em HTML e CSS com efeito parallax.',
    tags: ["HTML", "CSS"],
    action: "Ver no GitHub",
    href: "https://github.com/marloon-dev/Projeto-cordel",
  },
];

function DevToIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M6 9.5v5h1.2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2z" strokeWidth={1.6} />
      <path d="M13.6 9.5h-2v5h2M11.6 12h1.6" strokeWidth={1.6} />
      <path d="M15.6 9.5l1.2 5 1.2-5" strokeWidth={1.6} />
    </svg>
  );
}

function GmailIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M6 16V9l6 4.5L18 9v7" />
    </svg>
  );
}

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/marloon-dev/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/marloon-dev", icon: Github },
  { label: "Instagram", href: "https://www.instagram.com/marloon.dev/", icon: Instagram },
  { label: "Dev.to", href: "https://dev.to/marloon-dev", icon: DevToIcon },
  { label: "Gmail: marloon.dev@gmail.com", href: "mailto:marloon.dev@gmail.com", icon: GmailIcon },
];

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is Element => section !== null);
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.34;
      const visible = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });
      const nextSection = visible?.id ?? "";
      setActiveSection((current) => current === nextSection ? current : nextSection);
    };
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#inicio" aria-label="Marlon Nunes Vieira, início">
          <span className="wordmark-icon" aria-hidden="true">m.</span>
          <span>marlon<span className="wordmark-muted">.dev</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a
              className={activeSection === item.href.slice(1) ? "nav-link is-active" : "nav-link"}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-contact" href="#contato">
          Vamos conversar <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <nav
        className={menuOpen ? "mobile-nav is-open" : "mobile-nav"}
        id="mobile-navigation"
        aria-label="Navegação móvel"
        hidden={!menuOpen}
      >
        {navigation.map((item) => (
          <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}<ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
        <a href="#contato" onClick={() => setMenuOpen(false)}>
          Vamos conversar<ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-label="Monograma visual de Marlon Nunes Vieira">
      <div className="art-grid" aria-hidden="true" />
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="orbit-core" aria-hidden="true">
        <span className="core-top">MN</span>
        <span className="core-bottom">VIEIRA</span>
      </div>
      <div className="art-label art-label-top"><span className="live-dot" /> SOFTWARE, COM INTENÇÃO</div>
      <div className="art-coordinates" aria-hidden="true">PORTFÓLIO<br />GITHUB · MARLOON-DEV</div>
      <div className="art-stamp" aria-hidden="true"><Command size={16} /><span>IDEIA<br />EM AÇÃO</span></div>
      <span className="art-caption">DESENVOLVEDOR INDEPENDENTE <ArrowDownRight size={14} /></span>
    </div>
  );
}

const screens = [
  { id: "overview", label: "Visão Geral", alt: "Visão Geral do VM Guave: cartões das VMs, uso de CPU e memória, gráfico das últimas 24 horas e atividade recente" },
  { id: "machines", label: "Máquinas Virtuais", alt: "Lista de máquinas virtuais com busca, filtro por estado e ações" },
  { id: "images", label: "Imagens", alt: "Catálogo de imagens: distros Linux, Windows 11 ARM e macOS para baixar" },
  { id: "network", label: "Rede", alt: "Rede NAT com diagrama e os IPs fixos de cada máquina" },
  { id: "storage", label: "Armazenamento", alt: "Espaço em disco ocupado pelas VMs e imagens, com os discos de cada VM" },
  { id: "settings", label: "Configuração", alt: "Configuração do app: idioma, tema, autoinício, recursos padrão e atualizações" },
];

function ProductScreens() {
  const [active, setActive] = useState(screens[0].id);
  const current = screens.find((screen) => screen.id === active) ?? screens[0];

  return (
    <div className="product-window">
      <div className="window-bar">
        <div className="window-controls" aria-hidden="true"><i /><i /><i /></div>
        <span>VM Guave <span className="window-slash">/</span> {current.label}</span>
        <span className="window-status"><span /> App real</span>
      </div>
      <div className="screen-tabs" role="tablist" aria-label="Seções do app">
        {screens.map((screen) => (
          <button
            key={screen.id}
            type="button"
            role="tab"
            aria-selected={screen.id === active}
            className={screen.id === active ? "screen-tab is-active" : "screen-tab"}
            onClick={() => setActive(screen.id)}
          >
            {screen.label}
          </button>
        ))}
      </div>
      <img
        className="screen-image"
        src={`${import.meta.env.BASE_URL}vm-guave/${current.id}.jpg`}
        alt={current.alt}
        width={1600}
        height={1000}
      />
    </div>
  );
}

const highlights = [
  {
    title: "No Mac: app nativo em Swift",
    icon: Monitor,
    items: [
      "SwiftUI sobre o Virtualization.framework da Apple, para Apple Silicon",
      "VMs Linux, macOS e Windows 11 ARM, com o Windows na mesma janela",
      "Snapshots, suspender e retomar, clonagem e VM criptografada (AES-256)",
      "Rede com IP fixo, laboratório com várias VMs e Rosetta para x86_64",
      "Linha de comando bgctl, que conversa com o app por um protocolo próprio",
    ],
  },
  {
    title: "No Windows e Linux: Tauri + QEMU",
    icon: AppWindow,
    items: [
      "App em Rust e HTML, com aceleração WHPX (Windows) e KVM (Linux)",
      "Snapshots, suspender e redirecionamento de portas",
      "Controle das VMs (QMP) por socket só do usuário, sem porta TCP",
      "Instaladores .exe, .msi, .deb, .rpm e .AppImage",
    ],
  },
  {
    title: "Engenharia por trás",
    icon: Code2,
    items: [
      "Atualização automática com SHA-256 e assinatura Ed25519",
      "Release com um comando: versão, .dmg, assinatura, tag e Release",
      "GitHub Actions gera os instaladores de Windows e Linux a cada tag",
      "Interface em 11 idiomas, com checagem do que falta traduzir",
    ],
  },
];

function useVmGuaveStats() {
  const [stats, setStats] = useState({ version: "0.4.0", downloads: 57 });

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/repos/marloon-dev/vm-guave/releases?per_page=100")
      .then((response) => (response.ok ? response.json() : null))
      .then((releases: Array<{ tag_name: string; draft: boolean; prerelease: boolean; assets?: Array<{ download_count?: number }> }> | null) => {
        if (cancelled || !Array.isArray(releases) || releases.length === 0) return;
        const latest = releases.find((release) => !release.draft && !release.prerelease) ?? releases[0];
        const downloads = releases
          .flatMap((release) => release.assets ?? [])
          .reduce((total, asset) => total + (asset.download_count ?? 0), 0);
        setStats({ version: latest.tag_name.replace(/^v/, ""), downloads });
      })
      .catch(() => {
        // Sem rede ou limite da API: ficam os valores acima.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}

function SectionHeading({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {detail && <p>{detail}</p>}
    </div>
  );
}

export default function Home() {
  const vmGuave = useVmGuaveStats();

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />

      <main id="conteudo">
        <section className="hero page-wrap" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="availability-dot" /> DESENVOLVEDOR DE SOFTWARE</div>
            <h1 id="hero-title">Construo software<br /><span>com propósito.</span></h1>
            <p className="hero-intro">Sou <strong>Marlon Nunes Vieira</strong>. Crio apps nativos, experiências web e automações que transformam boas ideias em ferramentas reais — do Swift ao código aberto.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">Conheça meu trabalho <ArrowUpRight size={17} /></a>
              <a className="button button-quiet" href="#contato">Entre em contato <ArrowRight size={16} /></a>
            </div>
            <div className="hero-proof"><span className="proof-line" /><span>Ideias independentes. Software feito para durar.</span></div>
          </div>
          <HeroArtwork />
          <a className="scroll-cue" href="#projeto-principal"><span>ROLE PARA EXPLORAR</span><ArrowDown size={15} /></a>
        </section>

        <section className="feature-section section-wrap" id="projeto-principal" aria-labelledby="feature-title">
          <div className="feature-topline"><span className="eyebrow"><span className="eyebrow-mark" /> PROJETO EM DESTAQUE</span><span className="feature-index">01 <i /> 05</span></div>
          <div className="feature-intro">
            <div className="feature-title-block"><img className="guave-title-icon" src={`${import.meta.env.BASE_URL}vm-guave/icon.png`} alt="" width={51} height={51} /><div><h2 id="feature-title">VM Guave</h2><span className="feature-subtitle">Outro sistema, sem sair do seu.</span></div></div>
            <p>Gerenciador de máquinas virtuais que criei do zero: app nativo em Swift no Mac e app em Tauri sobre o QEMU no Windows e no Linux. Grátis e de código aberto (MIT).</p>
          </div>

          <div className="feature-facts" aria-label="Resumo do projeto VM Guave">
            <div><span>PLATAFORMAS</span><b>03</b><small>Mac · Windows · Linux</small></div>
            <div><span>VERSÃO ATUAL</span><b>{vmGuave.version}</b><small>atualização automática</small></div>
            <div><span>DOWNLOADS</span><b>{vmGuave.downloads.toLocaleString("pt-BR")}</b><small>nas Releases do GitHub</small></div>
            <div><span>TECNOLOGIA</span><b>Swift + Rust</b><small>SwiftUI · Tauri · QEMU</small></div>
          </div>

          <ProductScreens />
          <p className="mockup-caption">Capturas reais do app no Mac · ~10 mil linhas de Swift · interface em 11 idiomas</p>

          <div className="feature-highlights">
            {highlights.map(({ title, icon: Icon, items }) => (
              <article className="highlight-card" key={title}>
                <div className="skill-card-heading"><span className="skill-icon"><Icon size={17} /></span><h3>{title}</h3></div>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>

          <div className="feature-bottom">
            <div className="feature-links">
              <a className="button button-primary" href="https://marloon-dev.github.io/vm-guave/" target="_blank" rel="noreferrer">Site do VM Guave <ArrowUpRight size={16} /></a>
              <a className="button button-quiet" href="https://github.com/marloon-dev/vm-guave" target="_blank" rel="noreferrer"><Github size={16} /> Código</a>
              <a className="button button-quiet" href="https://github.com/marloon-dev/vm-guave/releases/latest" target="_blank" rel="noreferrer">Baixar <ArrowDown size={16} /></a>
            </div>
            <div className="feature-platforms"><span><i className="platform-dot platform-apple" /> macOS</span><span><i className="platform-dot platform-win" /> Windows</span><span><i className="platform-dot platform-linux" /> Linux</span></div>
          </div>
        </section>

        <section className="projects-section section-wrap" id="projetos" aria-labelledby="projects-title">
          <SectionHeading eyebrow="SELEÇÃO DE PROJETOS" title="Feitos para resolver." detail="Produtos, ferramentas e experimentos que saíram da ideia e ganharam forma." />

          <a className="featured-project-link" href="#projeto-principal">
            <span className="featured-link-index">01 / 05</span>
            <div><span className="card-category">Virtualização · Open source</span><h3>VM Guave</h3><p>Máquinas virtuais para Mac, Windows e Linux. App nativo em Swift no Mac e Tauri + QEMU no Windows e no Linux.</p></div>
            <span className="featured-link-arrow"><ArrowUpRight size={20} /></span>
          </a>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-card-top"><span className="project-number">{project.number} <i /> 05</span><span className="project-category">{project.category}</span></div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tag-list" aria-label={`Tecnologias: ${project.tags.join(", ")}`}>
                  {project.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}
                </div>
                <div className="project-card-bottom">
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {project.action}<MoveUpRight size={14} aria-hidden="true" />
                    </a>
                  ) : <span className="private-repo"><span />{project.action}</span>}
                </div>
              </article>
            ))}
          </div>
          <div className="projects-note"><span className="note-rule" />Também no GitHub: exercícios de Python, front-end e landing pages.<a href="https://github.com/marloon-dev?tab=repositories" target="_blank" rel="noreferrer">Mais projetos <ArrowUpRight size={14} /></a></div>
        </section>

        <section className="skills-section section-wrap" id="habilidades" aria-labelledby="skills-title">
          <SectionHeading eyebrow="FERRAMENTAS & TECNOLOGIAS" title="Um stack que conecta." detail="Da interface ao sistema, escolho a ferramenta certa para cada problema." />
          <div className="skills-grid">
            {skills.map(({ title, icon: Icon, items }, index) => (
              <article className="skill-card" key={title}>
                <div className="skill-card-heading"><span className="skill-icon"><Icon size={17} /></span><h3>{title}</h3><span className="skill-number">0{index + 1}</span></div>
                <div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="education-section section-wrap" id="formacao" aria-labelledby="education-title">
          <SectionHeading eyebrow="TRAJETÓRIA" title="Aprender também é construir." detail="Uma formação em andamento, guiada pela curiosidade e pela prática." />
          <div className="timeline">
            <article className="timeline-item">
              <span className="timeline-marker" />
              <div className="timeline-meta"><span>GRADUAÇÃO</span><span>EM ANDAMENTO</span></div>
              <div className="timeline-content"><h3>Engenharia de Software</h3><p>Graduação em andamento.</p></div>
            </article>
            <article className="timeline-item">
              <span className="timeline-marker" />
              <div className="timeline-meta"><span>FORMAÇÃO COMPLEMENTAR</span><span>CONTÍNUA</span></div>
              <div className="timeline-content"><h3>Cursos de tecnologia</h3><p>HTML5 e CSS3 (Curso em Vídeo), JavaScript, Python e Desenvolvimento Front-end para Web (Estudonauta).</p></div>
            </article>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contato" aria-labelledby="contact-title">
          <div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="contact-content">
            <span className="eyebrow"><span className="eyebrow-mark" /> PRÓXIMO PASSO</span>
            <h2 id="contact-title">Vamos fazer algo<br /><span>que faça diferença?</span></h2>
            <p>Estou aberto a oportunidades e projetos em parceria.</p>
            <div className="contact-actions">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  className="social-link"
                  href={href}
                  key={label}
                  aria-label={label}
                  title={label}
                  {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="contact-side-note"><span>FEITO COM CURIOSIDADE</span><span>ABERTO A NOVOS PROJETOS</span></div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="footer-brand" href="#inicio"><span className="wordmark-icon" aria-hidden="true">m.</span> marlon<span>.dev</span></a>
        <span>© {new Date().getFullYear()} Marlon Nunes Vieira</span>
        <a className="back-top" href="#inicio">De volta ao topo <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  );
}
