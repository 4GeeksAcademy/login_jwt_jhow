import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserHomeList } from "../component/userHomeList";
import { useParams } from "react-router-dom";

export const Project = () => {
	// console.log(useParams());
	const { id } = useParams();
	console.log(id);

	const [proyecto, setProject] = React.useState([]);

	useEffect(() => {
		const obtenerProyecto = async () => {
			const data = await fetch(
				`https://3001-xetnal-finalproject-s0srryejroy.ws-us45.gitpod.io/api/projects/${id}`
			);
			const project = await data.json();
			setProject(project);
		};
		obtenerProyecto();
	}, [id]);

	useEffect(() => {
		getUf();
	}, []);

	const [ufs, setUfs] = useState("");

	const getUf = async () => {
		const url =
			"https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=a8423be05204c1cb12e2d950d772c7018d0947ee&formato=json";
		const respuesta = await fetch(url);
		const info = await respuesta.json();
		const objetoUf = info.UFs;
		const valor = objetoUf[0];
		console.log(valor);
		const pesos = valor.Valor;
		console.log(pesos);
		setUfs(pesos);
		console.log(typeof ufs);
	};

	return (
		<div className="container mt-4 p-0">
			<h2>{proyecto.address}</h2>
			<div className="row">
				<div className="col-12 col-lg-8 p-0">
					<div className="card">
						<div id="demo" className="carousel slide" data-bs-ride="carousel">
							<div className="carousel-indicators">
								<button
									type="button"
									data-bs-target="#demo"
									data-bs-slide-to={0}
									className="active"
								/>
								<button
									type="button"
									data-bs-target="#demo"
									data-bs-slide-to={1}
								/>
								<button
									type="button"
									data-bs-target="#demo"
									data-bs-slide-to={2}
								/>
							</div>
							{/* The slideshow/carousel */}
							<div className="carousel-inner">
								<div className="carousel-item active">
									<img
										src={proyecto.pictures}
										alt="Los Angeles"
										className="d-block w-100"
									/>
								</div>
								<div className="carousel-item">
									<img
										src={proyecto.pictures}
										alt="Chicago"
										className="d-block w-100"
									/>
								</div>
								<div className="carousel-item">
									<img
										src={proyecto.pictures}
										alt="New York"
										className="d-block w-100"
									/>
								</div>
							</div>
							<button
								className="carousel-control-prev"
								type="button"
								data-bs-target="#demo"
								data-bs-slide="prev"
							>
								<span className="carousel-control-prev-icon" />
							</button>
							<button
								className="carousel-control-next"
								type="button"
								data-bs-target="#demo"
								data-bs-slide="next"
							>
								<span className="carousel-control-next-icon" />
							</button>
						</div>
					</div>
				</div>
				<div className="col-12 col-lg-4">
					<h2>Detalles: </h2>
					<div className="row">
						<div className="col-6 ">
							<p>Venta: </p>
							<p>Precio desde: </p>
							<p>Valor Uf de hoy :</p>
							<p>Dormitorios desde: </p>
							<p>Baños desde: </p>
							<p>Superficie desde:</p>
							<p>Empresa: </p>
						</div>
						<div className="col-6 ">
							<p>{proyecto.sale_type} </p>
							<p>UF {proyecto.total_price}</p>
							<p> $ {ufs} </p>
							<p>{proyecto.rooms}</p>
							<p>{proyecto.bathrooms}</p>
							<p>
								{proyecto.size} m<sup>2</sup>
							</p>
							<p>{proyecto.title}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="container-fluid p-0 d-flex justify-content-center mt-4">
				<button type="button mx-auto" className="btn btn-primary">
					Postula Acá
				</button>
			</div>

			<div className="container-fluid p-0">
				<h4>Ubicación</h4>
				<p>
					A pasos de la estación de metro Los Quillayes Ciclovía al exterior que
					conecta con red de ciclovías Rápido acceso a Autopistas.
				</p>
				<h4>Descripción</h4>
				<p>{proyecto.body}</p>
				<h4>Equipamiento</h4>
				<p>{proyecto.perks}</p>
			</div>
		</div>
	);
};

/* const ufs = UFs.map((uf) => {
			return uf.Valor;
		}); */
/* const valorFinal = ufs;
		console.log(valorFinal);
		return valorFinal; */
//console.log(typeof valorFinal);
/* const resultadoFinal = ufs[0].valor;
		return resultadoFinal; */
