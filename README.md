
## Microservicio uTriper 

### Instalación y Ejecución

1.  **Instalar dependencias:**
    `npm install`

2.  **Ejecutar microservicio:**
	`node index`

El servidor se ejecutará en `http://localhost:3000`.

### Actualización Automática de Tasas de Cambio  

Las tasas de cambio se actualizan automáticamente cada 4 horas.
### API de Conversión de Moneda
#### Endpoint: `/api/convert`

-   **Parámetros:**
    -   `amount`: Monto que se desea convertir.
    -   `from`: Moneda de origen (ej. USD, EUR, COP).
    -   `to`: Moneda de destino (ej. USD, EUR, COP).

#### Ejemplo de Uso:
`curl "http://localhost:3000/api/convert?amount=100&from=USD&to=EUR"`

#### Respuesta Exitosa:
{  "amount":  100,  "from":  "USD",  "to":  "EUR",  "convertedAmount":  85.23  }
