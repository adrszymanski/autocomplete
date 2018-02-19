var parts = [
	{'from': 12345, 'to': 13455},
	{'from': 12745, 'to': 13755},
	{'from': 2345, 'to': 2755},
	{'from': 5345, 'to': 9455},
	{'from': 2700, 'to': 5240},
	{'from': 345, 'to': 13455},
	{'from': 11345, 'to': 13000}
];

/**
 * Object of Class Plane keeps
 * current or last flight time informations.
 */
class Plane {
	constructor(from, to) {
		this.from = from;
		this.to = to;
	}
}

/**
 * Find how many planes we need for input number of flights.
 * 
 * @param {array} parts Flights
 * @returns {Number} Number of planes required
 */
function findNumberOfRequiredPlanes(parts) {
	// Planes needed for flights.
	const planes = [];
	// Sorting flights in time order.
	parts.sort((first, next) => first.from > next.from);

	// If there are no flights return 0.
	if (parts.length > 0) {
		// Getting first flight info into first plane obj.
		let firtPart = parts.shift();
		let firtPlane = new Plane(firtPart.from, firtPart.to);
		planes.push(firtPlane);

		// Loop through all the flights and connect them with planes.
		parts.forEach((part) => {
			if (part.from >= part.to) {
				console.log(`Flight: ${JSON.stringify(part)} => timeFrom later than timeTo`);
			} else {
			   findPlaneForFlight(planes, part); 
			}
			
		});

		return planes.length;
	} else {
		return 0;
	}
}

/**
 * Find plane for given time.
 * 
 * @param {Array} planes List of current planes
 * @param {Object} flight Flight data
 * @returns {undefined}
 */
function findPlaneForFlight(planes, flight) {
	let flag = 0;
	// If some plan already ended it's last flight, we can use it once more.
	for (let i = 0; i < planes.length; i++) {
		let currentPlane = planes[i];
		if (flight.from >= currentPlane.to) {
			currentPlane.from = flight.from;
			currentPlane.to = flight.to;
			flag = 1;
			break;
		}
	}
	// Else we will need one more plane to manage all flights.
	if (!flag) {
		let newPlane = new Plane(flight.from, flight.to);
		planes.push(newPlane);
	}
    }