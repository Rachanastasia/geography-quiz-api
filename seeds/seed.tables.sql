BEGIN;

TRUNCATE
"users";

INSERT INTO "users" ("id", "name", "email", "password")
VALUES(
  1,
  'rachel',
  'r.a.reill18@gmail.com',
  '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
);

COMMIT;