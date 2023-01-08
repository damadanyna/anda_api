-- creation de la base de donnee
create database memory_base;

-- séléction de la base de donnnee
use memory_base;

-- Table Utilisateurs
create table if not exists utilisateur(
    util_id int auto_increment not null,
    util_name varchar(100) null, 
    util_email varchar(150) null, 
    util_pass varchar(255) null, 
    util_status boolean not null,
    util_date_enreg datetime null default NOW(), 
    primary key (util_id)
)Engine=InnoDB;

-- Table Employer
create table if not exists employe(
    emp_im varchar(100) not null,
    emp_nom_prenom varchar(100) null, 
    date_naiss date  null, 
    sexe varchar(10) null, 
    emp_fonction varchar(100) not null,
    emp_tel varchar(50) not null,
    emp_adresse varchar(100) not null,
    emp_date_enreg datetime null default NOW(), 
    primary key (emp_im)
)Engine=InnoDB;
 

-- Table Presence
create table if not exists presence(
    id_pres int auto_increment not null,
    im_emp varchar(100) null, 
    statut_pres boolean  null,  
    pres_date_enreg varchar(100) null, 
    pres_heure_enreg varchar(50) null, 
    primary key (id_pres)
)Engine=InnoDB;
 

-- Table Conge
create table if not exists conge(
    id_conge int auto_increment not null,
    im_emp varchar(100) null, 
    type_conge varchar(50) null,
    motif_conge varchar(150) null,
    nbr_jour int null,
    conge_date_enreg datetime null default NOW(), 
    primary key (id_conge)
)Engine=InnoDB;
