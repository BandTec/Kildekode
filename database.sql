
ALTER TABLE registros
DROP COLUMN data_hora;

ALTER TABLE registros
ADD COLUMN data_hora timestamp DEFAULT NOW();

ALTER TABLE registros
DROP COLUMN processos;

ALTER TABLE registros
ADD COLUMN processos numeric;


CREATE OR REPLACE FUNCTION get_values (p_type VARCHAR,p_limit integer) 
   RETURNS TABLE (
      value NUMERIC,
      data_hora timestamp
) 
AS $$
BEGIN
  IF p_type='ram' THEN
   RETURN QUERY SELECT J.* AS S FROM (SELECT R.ram,R.data_hora FROM registros as R ORDER BY R.data_hora DESC LIMIT p_limit)as J  ORDER BY J.data_hora ASC;
  ELSIF p_type='processos' THEN
    RETURN QUERY SELECT J.* AS S FROM (SELECT R.processos,R.data_hora FROM registros as R ORDER BY R.data_hora DESC LIMIT p_limit) as J ORDER BY J.data_hora ASC;
  ELSIF p_type='cpu' THEN
    RETURN QUERY SELECT J.* AS S FROM (SELECT R.cpumaquina,R.data_hora FROM registros as R ORDER BY R.data_hora DESC LIMIT p_limit) as J ORDER BY J.data_hora ASC;
  ELSIF p_type='disco' THEN
    RETURN QUERY SELECT J.* AS S FROM (SELECT R.disco,R.data_hora FROM registros as R ORDER BY R.data_hora DESC LIMIT p_limit) as J ORDER BY J.data_hora ASC;
  END IF;

END; $$
LANGUAGE 'plpgsql';

-- executa este cara abaixo
select * from get_values('ram',5);



kildekode.postgres.database.azure.com
whoami@kildekode
P@55w.rd