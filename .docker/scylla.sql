CREATE KEYSPACE fsfc
WITH replication = {'class': 'SimpleStrategy', 
                             'replication_factor': '1'};
USE fsfc;

CREATE type fsfc.position(
  lat double,
  lng double
);
CREATE TABLE fsfc.route(
  id int PRIMARY KEY,
  title text,
  "startPosition" position,
  "endPosition" position
);

INSERT INTO fsfc.route (id, title, "startPosition", "endPosition") 
VALUES (1, 'Primeiro', { lat: -15.82594, lng: -47.92923 }, { lat: -15.82942, lng: -47.92765 });
INSERT INTO fsfc.route (id, title, "startPosition", "endPosition") 
VALUES (2, 'Segundo', { lat: -15.82449, lng: -47.92756 }, { lat: -15.8276, lng: -47.92621 });
INSERT INTO fsfc.route (id, title, "startPosition", "endPosition") 
VALUES (3, 'Terceiro', { lat: -15.82331, lng: -47.92588 }, { lat: -15.82758, lng: -47.92532 });

