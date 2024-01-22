Bitpay challenge

Correr el proyecto en local:

1 - Descargar/Clonar el proyecto  
2 - Correr el comando npm install para construir los modulos de node e instalar dependencias  
3 - Crear archivo .env.local con las siguientes claves:  
 NEXT_PUBLIC_X_DEVICE_ID={"your_public_x_device_id"}  
 NEXT_PUBLIC_BASE_URL="http://localhost:3000"  
4 - Correr el comando npm run dev  
5 - Ingresar a la url localhost:3000 en el navegador para utilizar

NOTA:

A la ruta de órdenes solo podemos llegar utilizando la URL ya que no estaba especificado en el diseño no quise romper el diseño de figma!

Bitpay | Ordenes => https://bitnovo-pay.vercel.app/orders

Rutas de la aplicación:

1 - "/" => Bitpay | Home - Creación de pagos.  
2 - "/orders" => Bitpay | Ordenes - Listado de todas las órdenes realizadas (incluye Links para navegar al pago de la órden).  
3 - "/order/{identifier} => Bitpay | Orden - Pantalla de pago con información detallada para realizar el envio de crypto.  
4 - "/order/failed" => Bitpay | Orden fallida - Pantalla de órden fallida o expirada.  
5 - "/order/completed" => Bitpay | Orden exitosa - Pantalla de órden completa o exitosa.

Funcionamiento de cobros:

Ripple Test XRP:

Se puede generar un cobro en Ripple Test XRP y realizar el pago utilizando el wallet address y tag/memo en la web https://test.xrptoolkit.com/connect-wallet

Ethereum Goerli ETH:

Se puede generar un cobro en Ethereum Goerli ETH y realizar el pago utilizando el wallet address o también se puede utilizar la opcion de Web3 y clickear en el botón de Metamask. Esto solicitará acceso a su cuenta de Metamask y recibirá un prompt requiriendo el pago con la cantidad exacta de GoerliETH a enviar.

Ambos pagos estarán escuchando un web socket por lo tanto se actualizarán sus valores en tiempo real.

Si el importe total requerido es recibido, será redirigido a la pantalla de Orden Exitosa.
De igual manera si el tiempo de pago expira será redirigido a la pantalla de Orden Fallida.

Una vez finalizado el proceso, si desea volver a ver detalles de su transacción ya sea exitosa o fallida puede visitar la pantalla de Bitpay | Ordenes y buscarla en el listado
