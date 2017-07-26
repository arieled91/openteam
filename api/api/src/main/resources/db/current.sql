create table openteam.event (id bigint generated by default as identity, creation_time binary(255), date_time binary(255), name varchar(255), primary key (id))
create table openteam.player (id bigint generated by default as identity, active boolean not null, creation_time binary(255), email varchar(255), guest boolean not null, name varchar(255), primary key (id))
create table openteam.team (id bigint generated by default as identity, creation_time binary(255), name varchar(255), primary key (id))
create table event_teams (key bigint not null, event_id bigint not null)
create table team_players (key bigint not null, team_id bigint not null)
alter table event_teams add constraint UK_orl1xr1t0gs9xapgvgngt5fpd unique (event_id)
alter table team_players add constraint UK_btdc5q71c0sc02lf7o7s8ejvv unique (team_id)
alter table event_teams add constraint FKl26hyqmnoa9agu3tsbf80qh14 foreign key (event_id) references openteam.team
alter table event_teams add constraint FKsh5je8kbf33n5gs8b7rg09jb3 foreign key (key) references openteam.event
alter table team_players add constraint FKdpsm81jfdfowjr80plmbt7u49 foreign key (team_id) references openteam.player
alter table team_players add constraint FKmixtnce627tbn9pyhpw9ijbb6 foreign key (key) references openteam.team