import axios from 'axios';
import React from 'react'

import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.css'

import {addLastRegistro, setAlert, setLastRegistro} from '../redux/actions'
import { displayDatetime, displayDatetimeFechaTime, displayGenero } from '../lib/functions';
import TablaRegistros from '../components/TablaRegistros';

const { defaults: pool } = require("../lib/queries");

export async function getStaticProps() {
	// Call an external API endpoint to get posts.
	// You can use any data fetching library
	let registros = [];
	try {
		const res = await pool.query('SELECT * FROM personas order by id desc limit 5', [])
		console.log(res.rows[0]);
		registros = res.rows.map(itm=>{
			return {...itm, nacimiento: (itm.nacimiento.toISOString())}
		})
	} catch (error) {
		
	}
  
	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
	  props: {
		registros,
	  },
	}
  }

function Home(props) {
	const [values, setValues] = React.useState({});
	const [errors, setErrors] = React.useState({});
	const registros = useSelector((state)=>state.last_registros);
	const dispatch = useDispatch();

	React.useEffect(()=>{
		dispatch(setLastRegistro(props.registros||[]))
	}, [props.registros])

	const onChange = (e) => {
		const target = e.target;
		setValues((p)=>({...p, [target.name]: target.value}));
	}

	const submit = (e) => {
		e.preventDefault();
		axios.post("/registro", values).then((res)=>{
			dispatch(setAlert(res.data.alert))
			dispatch(addLastRegistro(res.data.ele))
			setValues({});
		}).catch((error)=>{
			console.log({...error});
			const data = error.response?.data
			const errors = data?.errors;
			if (errors) setErrors(errors);
			dispatch(setAlert(data?.alert));
		})
	}
	
	return <main>
		<Container className={styles.section}>
				<h1 className={styles.title}>
					Pruebas Practicas EQUAA
				</h1>
				<Row className="w-100">
					<Col xs={12}>
						<Form onSubmit={submit}>
							<Card>
								<Card.Body>
										<Form.Group controlId="nombre">
											<Form.Label>Nombre</Form.Label>
											<Form.Control type="text" placeholder="Ingrese el nombre" required value={values.nombre||''} name="nombre" onChange={onChange} />
										</Form.Group>
										<Form.Group controlId="apellidos">
											<Form.Label>Apellidos</Form.Label>
											<Form.Control type="text" placeholder="Apellidos" required value={values.apellidos||''} name="apellidos" onChange={onChange} />
										</Form.Group>
										<Form.Group controlId="correo">
											<Form.Label>Correo electrónico</Form.Label>
											<Form.Control type="email" placeholder="name@mail.com" required value={values.correo||''} name="correo" onChange={onChange} />
										</Form.Group>
										<Form.Group controlId="nacimiento">
											<Form.Label>Fecha de nacimiento</Form.Label>
											<Form.Control type="date" placeholder="dd/mm/aaaa" required value={values.nacimiento||''} name="nacimiento" onChange={onChange} />
											{values.nacimiento && <Form.Text className="text-muted">
												La fecha es: {displayDatetimeFechaTime(values.nacimiento)}
											</Form.Text>}
										</Form.Group>
										<Form.Group controlId="genero">
											<Form.Label>Género</Form.Label>
											<Form.Check type="radio" id="genero-m" label="Masculino" name="genero" required value="M" checked={values.genero=='M'} onChange={onChange} />
											<Form.Check type="radio" id="genero-f" label="Femenino" name="genero" required value="F" checked={values.genero=='F'} onChange={onChange} />
											<Form.Check type="radio" id="genero-o" label="Otro" name="genero" required value="O" checked={values.genero=='O'} onChange={onChange} />
										</Form.Group>
								</Card.Body>
								<Card.Footer className="d-flex justify-content-end">
									<Button variant="primary" type="submit">
										Registrar datos
									</Button>
								</Card.Footer>
							</Card>
						
						</Form>
					</Col>
				</Row>
		</Container>
		<Container className={styles.section}>
			<h3>Ultimos{registros.length ? ' '+registros.length:''} registros</h3>
			<TablaRegistros registros={registros} />
		</Container>
	</main>
}

Home.title = "Inicio"

export default Home