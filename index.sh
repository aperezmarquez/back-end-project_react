echo "CREANDO UN COMERCIO"

curl -X POST -H 'Content-Type: application/json' --data '{"nombre":"antonio", "cif":"example", "direccion":"C/Cabo Gata, 3", "mail":"example@gmail.com", "telefono":"681940815", "id": 1}' http://localhost:4000/api/comercio/

echo -e "\n\nUPDATE DEL COMERCIO POR CIF"

curl -X PATCH --data '{"nombre": "jose"}' -H "Content-Type: application/json" http://localhost:4000/api/comercio/example

echo -e "\n\nDELETE DEL COMERCIO POR CIF"
curl -X DELETE http://localhost:4000/api/comercio/example
