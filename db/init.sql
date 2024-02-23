SELECT 'CREATE DATABASE elsolnec'
WHERE NOT EXISTS ( SELECT FROM pg_database WHERE datname = 'elsolnec')\gexec

