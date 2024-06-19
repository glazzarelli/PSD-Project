# Executable process

The model of the Babies360 executable process has been realized using **Camunda modeler**.

Along with the parents' process of choosing a service and entering all the necessary details of the request, supporting them from start to finish, we have also modeled the babysitter's registration to the system and their weekly availabilities update.

The [/forms](https://github.com/glazzarelli/PSD-Project/tree/main/processes/executable/forms) folder contains all the forms linked to the user tasks, that have been created in order to either get user input or visualize the result of the performed operation.

The service tasks have been implemented with the use of the **REST Connectors** extension: they therefore call the REST [services](https://github.com/glazzarelli/PSD-Project/tree/main/services) implemented for each of the third parties.

_Note that we used the `host.docker.internal` alias instead of `localhost` to connect to the services, since the Camunda platform runs inside a Docker VM_
