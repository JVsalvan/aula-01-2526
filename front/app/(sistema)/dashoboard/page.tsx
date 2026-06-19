import { buscarTodos } from "@/app/services/academiaService";
import { buscarListaUsuarios } from "@/app/services/usuarioService";
import { Academia } from "@/app/types/academia";
import { Usuario } from "@/app/types/usuarios";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const currentYear = new Date().getFullYear();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [academias, setAcademias] = useState<Academia[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {

      const usuariosResult = await buscarListaUsuarios();
      const academiasResult = await buscarTodos();

      setUsuarios(usuariosResult);
      setAcademias(academiasResult);

    } catch (error) {
      console.log(error);
    }
  }

  const totalUsuarios = usuarios.length;

  const usuariosAtivos =
    usuarios.filter(
      usuario => usuario.status === "ATIVO"
    ).length;

  const usuariosInativos =
    usuarios.filter(
      usuario => usuario.status === "INATIVO"
    ).length;

  const totalAcademias = academias.length;

  return (
    <div className="p-6 lg:p-10 bg-neutral-950 min-h-screen text-neutral-200">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-800 pb-8">

          <div>
            <h1 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em] mb-2">
              Painel de Controle
            </h1>

            <h2 className="text-4xl font-light text-white tracking-tight">
              Olá, <span className="font-semibold text-orange-500">João Salvan</span>
            </h2>
          </div>

          <div className="flex gap-4">
            <button className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
              Configurações
            </button>

            <button className="bg-white text-black px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-orange-500 transition-all">
              + Novo Usuário
            </button>
          </div>

        </header>

        {/* MÉTRICAS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {[
            {
              label: "Total Usuários",
              value: totalUsuarios,
              trend: "Cadastrados"
            },
            {
              label: "Usuários Ativos",
              value: usuariosAtivos,
              trend: "Ativos"
            },
            {
              label: "Usuários Inativos",
              value: usuariosInativos,
              trend: "Inativos"
            },
            {
              label: "Academias",
              value: totalAcademias,
              trend: "Cadastradas"
            }
          ].map((stat, i) => (

            <div key={i} className="space-y-1">

              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                {stat.label}
              </p>

              <p className="text-3xl font-light text-white italic tracking-tighter">
                {stat.value}
              </p>

              <p className="text-[10px] text-orange-500/80 font-medium">
                {stat.trend}
              </p>

            </div>

          ))}

        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-4">

          {/* ACADEMIAS */}
          <section className="lg:col-span-4 space-y-6">

            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">

              <h3 className="text-xs font-black uppercase tracking-widest text-white">
                Academias
              </h3>

              <span className="bg-orange-500 text-[10px] text-black px-2 py-0.5 font-bold">
                Sistema
              </span>

            </div>

            <div className="divide-y divide-neutral-900">

              {academias.slice(0, 5).map((academia, i) => (

                <div
                  key={i}
                  className="py-4 flex items-center justify-between group cursor-pointer"
                >

                  <span className="text-neutral-300 group-hover:text-orange-500 transition-colors font-medium">
                    {academia.name}
                  </span>

                  <span
                    className={`text-[11px] font-mono italic ${
                      academia.status === "ATIVO"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {academia.status}
                  </span>

                </div>

              ))}

            </div>

          </section>

          {/* USUÁRIOS */}
          <section className="lg:col-span-8 space-y-6">

            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">

              <h3 className="text-xs font-black uppercase tracking-widest text-white">
                Últimos Usuários
              </h3>

              <a
                href="#"
                className="text-[10px] text-neutral-500 hover:text-orange-500 transition-colors uppercase font-bold tracking-widest"
              >
                Ver Todos
              </a>

            </div>

            <div className="w-full overflow-hidden">

              <table className="w-full text-left text-sm">

                <thead>

                  <tr className="text-neutral-600 border-b border-neutral-900">

                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest">
                      Nome
                    </th>

                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest">
                      Email
                    </th>

                    <th className="pb-4 font-black uppercase text-[10px] tracking-widest text-right">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-neutral-900">

                  {usuarios.slice(0, 5).map((usuario, i) => (

                    <tr
                      key={i}
                      className="group hover:bg-neutral-900/30 transition-colors"
                    >

                      <td className="py-4 font-medium text-neutral-200">
                        {usuario.name}
                      </td>

                      <td className="py-4 text-neutral-500">
                        {usuario.email}
                      </td>

                      <td className="py-4 text-right">

                        <span
                          className={`text-[10px] font-bold uppercase tracking-tighter ${
                            usuario.status === "ATIVO"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {usuario.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        </div>

        <footer className="pt-20 text-center">

          <p className="text-[10px] font-medium text-neutral-700 uppercase tracking-[0.5em]">
            FitManager © {currentYear}
          </p>

        </footer>

      </div>

    </div>
  );
}

