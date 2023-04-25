# Air Ticket Booking System

## *User end points*;

1. `POST`: `/user/register`
   This end point takes name, email, and password in the form of String form body and return back a successfull message.

2. `POST`: `/user/login`
   This end point takes two Strings email and password form req.body

## *Flight end point*;

1. `GET`: `/flight/flights/`
   This will give all the available flights

2. `GET`: `/flight/flights/:id`
   This will give data of a specific flight

3. `POST`: `/flight/flights/`
   This route will create a new flight data, formate of the data should be like give below object
  ```
  {
   airline: String,
   flightNo: String,
   departure: String,
   arrival: String,
   departureTime: Date,
   arrivalTime: Date,
   seats: Number,
   price: Number,
   }
  ```
   Pass this from req.body and it returns back a success message that flight created successfully

4. `PATCH`: `/flight/flights/:id`
   This route will take id from params and updated object from req.body of that specific flight, which the user wants to update

5. `DELETE`: `/flight/flights/:id`
   This route will take id from params of that specific flight, which the user wants to delet

## *Booking end points*

1. `POST`: `/booking`
   This route will take userId and flightId that you want to booking and returns back a success message;

2. `GET`: `/booking/dashboard`
   This route will give all the booking datas of users to the response;
