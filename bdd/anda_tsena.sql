-- creation de la base de donnee
create database anda_tsena; 
-- séléction de la base de donnnee
use anda_tsena;

-- Table fournisseur
create table if not exists fournisseur(
    fourn_id int auto_increment not null,
    ville_id int not null,
    localisation_ varchar(150) not null,
    fourn_name varchar(150) not null, 
    fourn_email varchar(150) not null, 
    fourn_nif varchar(150) not null, 
    fourn_stat varchar(150) not null, 
    fourn_tel text not null,
    fourn_pass text not null, 
    fourn_status boolean not null,
    fourn_img_log_middle varchar(60) null,
    fourn_img_bg varchar(60) null,
    fourn_img_log_big varchar(60) null,
    fourn_date_enreg datetime null default NOW(), 
    primary key (fourn_id)
)Engine=InnoDB;

-- Table Produits
create table if not exists produit(
    prod_id int auto_increment not null,	
    fourn_id int not null,	
    prod_label  varchar(100) not null, 
    prod_description  text not null,
    prod_prix int not null,
    prod_disp boolean not null,
    prod_date_enreg datetime null default NOW(), 	
    primary key (prod_id) 
)Engine=InnoDB;

-- Table image
create table if not exists images(
    img_id int auto_increment not null,
    prod_id int not null,
    img_midle varchar(100) not null,
    img_big 	varchar(100) not null,
    img_date_enreg datetime null default NOW(),
    primary key (img_id)
)Engine=InnoDB;

-- Table Abonement
create table if not exists abonement(
    abo_id  int auto_increment not null,
    fourn_id int not null,
    client_id int not null,
    abo_data_enreg datetime null default NOW(),
    primary key (abo_id)
)Engine=InnoDB;

-- Table viewer
create table if not exists viewer(
    vue_id int auto_increment not null,
    prod_id int not null,
    client_id int not null,
    vue_date_enreg datetime null default NOW(), 
    primary key (vue_id)
)Engine=InnoDB;

-- Table Categorie
create table if not exists categorie(
    cat_id int auto_increment not null,
    cat_label varchar(60) not null,
    cat_date_enreg datetime null default NOW(),
    primary key (cat_id)
)Engine=InnoDB;

-- Table Client
create table if not exists client(  
    client_id int auto_increment not null,	
    client_nom varchar(150) not null,
    client_tel varchar(50) not null,
    client_prenom varchar(150) not null, 	
    client_date_naiss varchar(255) not null,	
    client_local varchar(150) not null,
    client_img_midle varchar(60) not null,	
    client_img_big varchar(60) not null,
    client_date_enreg datetime null default NOW(),
    primary key (client_id)
)Engine=InnoDB;

-- Table Ville
create table if not exists ville(  
    ville_id int auto_increment not null,	
    ville_label varchar(50) not null,
    ville_code_postal int not null,
    ville_local text not null,
    ville_date_enreg datetime null default NOW(),
    primary key (ville_id)
)Engine=InnoDB;

-- Table Tendence
create table if not exists tendence(  
    tend_id int auto_increment not null,	
    client_id  int not null,
    cat_id int not null, 
    tend_date_enreg datetime null default NOW(),
    primary key (tend_id)
)Engine=InnoDB;

-- Table Reaction
create table if not exists reaction(  
    rea_id  int auto_increment not null,
    client_id  int not null,
    fourn_id  int not null,
    prod_id int not null,
    rea_date_enreg datetime null default NOW(),
    primary key (rea_id)
)Engine=InnoDB; 

-- Table Emmotion
create table if not exists emmotion(  
    emm_id int auto_increment not null,
    emm_ico text not null, 
    emm_date_enreg datetime null default NOW(),
    primary key (emm_id)
)Engine=InnoDB; 

-- Table Panier
create table if not exists panier(  
    panier_id  int auto_increment not null,
    client_id int not null,
    panier_nbr int not null,
    prod_id int not null,
    panier_date_enreg datetime null default NOW(),
    primary key (panier_id)
)Engine=InnoDB; 

-- Table Visiteur
create table if not exists visiteur(  
    vis_id int not null,
    client_id int not null,
    fourn_id int not null, 
    vis_date_enreg datetime null default NOW(),
    primary key (vis_id)
)Engine=InnoDB; 