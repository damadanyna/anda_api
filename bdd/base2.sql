
-- Table Utilisateurs
create table if not exists utilisateur(
    util_id int auto_increment not null,
    util_label varchar(100) null, -- Medecin Chef
    util_login varchar(150) null, -- chef
    util_mdp varchar(255) null, -- 1234
    util_date_enreg datetime null default NOW(), -- "a", "c"
    primary key (util_id)
)Engine=InnoDB;
