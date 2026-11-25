import { CajaDesplegable } from "./CajaDesplegable";
import { ENTRADA } from "./clases";
import { diasDelMes, dosDigitos, fechaDePartes, MESES, partesDeFecha, type PartesDeFecha } from "./partesDeFecha";

type Props = {
  nombre: string;
  etiqueta: string;
  ayuda?: string;
  /** `AAAA-MM-DD`, `AAAA-MM`, `AAAA` o `""`. */
  valor: string;
  alCambiar: (valor: string) => void;
  /** Lo que el último guardado dijo de este campo. */
  error?: string;
  /** Si la fecha puede llevar día. Sin él, año y mes: lo que muestra quien la usa. */
  conDia?: boolean;
};

const ETIQUETA = "block text-admin-meta text-gris-texto";

/**
 * Una fecha con la precisión que da la fuente: año, y si se sabe, el mes y el
 * día. Tres controles en un `fieldset`: el año se escribe (cuatro cifras) y el
 * mes y el día se eligen, con «Sin mes» y «Sin día». El día depende del mes:
 * sin mes queda deshabilitado, y sus opciones son las de ese mes. Si el mes
 * nuevo no tiene el día elegido (el 31 en abril), el día se suelta. Con
 * `conDia` en falso, son dos: el año y el mes.
 */
export function Fecha({ nombre, etiqueta, ayuda, valor, alCambiar, error, conDia = true }: Props) {
  const partes = partesDeFecha(valor);
  const cambiar = (nuevas: Partial<PartesDeFecha>) => {
    const juntas = { ...partes, ...nuevas };
    if (!juntas.mes || !conDia) juntas.dia = "";
    if (juntas.dia && Number(juntas.dia) > diasDelMes(juntas.anio, juntas.mes)) juntas.dia = "";
    alCambiar(fechaDePartes(juntas));
  };
  const idAyuda = `${nombre}-ayuda`;
  const idError = `${nombre}-error`;
  const describe = [ayuda ? idAyuda : "", error ? idError : ""].filter(Boolean).join(" ") || undefined;
  const invalido = error ? true : undefined;
  const dias = diasDelMes(partes.anio, partes.mes);
  return (
    <fieldset className="min-w-0">
      <legend className="text-admin-meta font-medium">{etiqueta}</legend>
      {ayuda ? (
        <p id={idAyuda} className="mt-1 text-admin-meta text-gris-texto">
          {ayuda}
        </p>
      ) : null}
      {/* Una unidad: las partes se reparten la fila en columnas iguales y la llenan, como cualquier `Unidad`. En el celular, una abajo de la otra. */}
      <div className={`mt-1 grid gap-2 ${conDia ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        <label className="min-w-0">
          <span className={ETIQUETA}>Año</span>
          {/* `-campo`: el editor lleva el foco acá cuando la fecha no pasa. */}
          <input
            id={`${nombre}-campo`}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={partes.anio}
            aria-describedby={describe}
            aria-invalid={invalido}
            onChange={(e) => cambiar({ anio: e.target.value.replace(/\D/g, "") })}
            className={`mt-1 ${ENTRADA}`}
          />
        </label>
        <label className="min-w-0">
          <span className={ETIQUETA}>Mes</span>
          <CajaDesplegable value={partes.mes} aria-describedby={describe} aria-invalid={invalido} onChange={(e) => cambiar({ mes: e.target.value })}>
            <option value="">Sin mes</option>
            {MESES.map((mes, i) => (
              <option key={mes} value={dosDigitos(i + 1)}>
                {mes}
              </option>
            ))}
          </CajaDesplegable>
        </label>
        {conDia ? (
          <label className="min-w-0">
            <span className={ETIQUETA}>Día</span>
            <CajaDesplegable
              value={partes.dia}
              disabled={!partes.mes}
              aria-describedby={describe}
              aria-invalid={invalido}
              onChange={(e) => cambiar({ dia: e.target.value })}
              className="disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">Sin día</option>
              {Array.from({ length: dias }, (_, i) => (
                <option key={i} value={dosDigitos(i + 1)}>
                  {i + 1}
                </option>
              ))}
            </CajaDesplegable>
          </label>
        ) : null}
      </div>
      {error ? (
        <p id={idError} className="mt-1 text-admin-meta text-rojo-error">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
