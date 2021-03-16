import React from 'react'
import { Table } from "react-bootstrap";
import { displayDatetime, displayGenero } from "../lib/functions";

export default function TablaRegistros ({registros, ...props}) {
    const eleLastRegistros = registros.map((itm)=>{
		return <tr>
			<td>{itm.id}</td>
			<td>{itm.nombre}</td>
			<td>{itm.apellidos}</td>
			<td>{itm.correo}</td>
			<td>{displayDatetime(itm.nacimiento, {timeStyle: undefined})}</td>
			<td>{displayGenero(itm.genero)}</td>
		</tr>
	});
    return <Table striped hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Fecha de nacimiento</th>
                <th>Genero</th>
            </tr>
        </thead>
        <tbody>
            {registros && registros!=0 ? eleLastRegistros : <tr>
                <td colSpan={6}>Sin registros</td>
            </tr>}
        </tbody>
    </Table>
}