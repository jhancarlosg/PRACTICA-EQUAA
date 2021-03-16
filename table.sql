CREATE TABLE public.personas
(
    id SERIAL,
	nombre character varying(50) not null,
	apellidos character varyingn(150) not null,
	correo character varying(150) not null,
	nacimiento date not null,
	genero "char" not null,
	UNIQUE(correo),
    PRIMARY KEY (id)
);