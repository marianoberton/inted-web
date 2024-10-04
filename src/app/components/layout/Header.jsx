import { Button } from "../ui/button"; // Ajuste de la ruta a relativa
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-2xl font-bold">
        <Link href="/">Mi Consulta</Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" passHref>
              <Button variant="link">Inicio</Button>
            </Link>
          </li>
          <li>
            <Link href="/servicios" passHref>
              <Button variant="link">Servicios</Button>
            </Link>
          </li>
          <li>
            <Link href="/quienes-somos" passHref>
              <Button variant="link">Quiénes Somos</Button>
            </Link>
          </li>
          <li>
            <Link href="/contrataciones" passHref>
              <Button variant="link">Contrataciones</Button>
            </Link>
          </li>
          <li>
            <Link href="/novedades" passHref>
              <Button variant="link">Novedades</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
