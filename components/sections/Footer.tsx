export function Footer() {
    return (
        <footer className="bg-white border-t border-neutral-100 py-12 px-4">
            <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm text-neutral-500">
                    © {new Date().getFullYear()} AMON. Todos los derechos reservados.
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-neutral-600">
                    <a href="#" className="hover:text-black transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-black transition-colors">Ética IA</a>
                    <a href="#" className="hover:text-black transition-colors">Contacto</a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
