# Babies360

We want to model the service offered by an agency specialized in providing services to new parents. The company relies on the services offered by professionals such as babysitters, pedagogical consultants and event organizers.
Based on the requests of the parents the agency help them by coordinating the communication with other service providers.

## Members
* Francesca Grimaldi, 10744925
* Matteo Fiorentino, 10686260
* Gabriele Lazzarelli, 10623766

# Third party services
* baby sitters
* party organizer
* pedagogical consultant


In our design, the parents query Babies360 for the available services, then if interested they can choose one.

Each service request has a different set of parameters based on the type of service requested, e.g. the `date` and `time` and for how many `hours` in case of the babysitter request.

Each service provision differs from one another:
- the **Babysitting service** takes place in the Babies360 platform from start to finish. The parents insert their specific needs and then decide which babysitter they prefer from the list of available ones. The payment has to take place within one day from the selection in order to confirm the appointment;
- in the **Party Organizer service** the parents only decide which type of services (among the "party services", e.g., catering, entertainment, ...) they will need. A party organizer will then search the suitable options for each category and will report back to Babies360, that will ultimately forward the proposals to the parents. If the proposal is accepted the plan is confirmed and the payment will be deducted after the party;
- for the **Pedagogical Consultant service** Babies360 acts only as a professional search portal: parents enter their location and are presented with a list of experts in the area, along with contacts and pertinent details. After that, they can get in touch with the consultants of their choice and handle the scheduling of the appointment on their own. The consultants will be required to pay Babies360 a fee for each appointment they make thanks to the platform.

## Choreographed process

![BPMN choreography of babies360](processes/choreography/choreography.svg)

## Collaboration Diagram

![BPMN collaboration of babies360](processes/collaboration/collaboration.svg)

## Executable process

![BPMN collaboration of babies360](processes/executable/executable.svg)

## Petri Net

![PetriNet of babies360](processes/petrinet/petrinet.png)

[PDF version](processes/petrinet/petrinet.pdf) for better readability
