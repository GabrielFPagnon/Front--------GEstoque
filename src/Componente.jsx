import './style.css'

let nome = 'Jason';
let disponibilidade = true;

export default function Componente() {
    return (
        <>
            <h2>Seja bem vindo {nome} </h2>
            <p>A multip. de 4x3 = {4 * 3}</p>
            <p>Está: {disponibilidade ? 'Disponivel' : 'Não disponivel'}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aperiam commodi provident voluptatibus nam? Aliquid perspiciatis provident ipsum ducimus soluta obcaecati delectus beatae reprehenderit. Possimus incidunt debitis voluptatum! Commodi, et!</p>
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
            </ul>
        </>
    )
}
