/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Replace with the correct path to your AppModule

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import your main application module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /user (Get all users)', async () => {
    const response = await request(app.getHttpServer()).get('/user').expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('GET /user/:id (Get user by ID)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    const response = await request(app.getHttpServer()).get(`/user/${userId}`).expect(200);
    expect(response.body).toHaveProperty('id', userId);
  });

  it('POST /user (Create a user)', async () => {
    const userPayload = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
    };
    const response = await request(app.getHttpServer()).post('/user').send(userPayload).expect(201);
    expect(response.body).toMatchObject(userPayload);
  });

  it('PUT /user/:id (Update a user)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    const updatePayload = {
      firstname: 'Jane',
      lastname: 'Doe',
    };
    const response = await request(app.getHttpServer())
      .put(`/user/${userId}`)
      .send(updatePayload)
      .expect(200);
    expect(response.body).toMatchObject(updatePayload);
  });

  it('DELETE /user/:id (Delete a user)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    await request(app.getHttpServer()).delete(`/user/${userId}`).expect(200);
  });

  it('POST /user/:id/orders (Place an order)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    const orderPayload = {
      foodItems: [{ itemName: 'Pizza', quantity: 2, price: 15 }],
      totalAmount: 30,
    };
    const response = await request(app.getHttpServer())
      .post(`/user/${userId}/orders`)
      .send(orderPayload)
      .expect(201);
    expect(response.body).toHaveProperty('orders');
    expect(response.body.orders[0]).toMatchObject(orderPayload);
  });

  it('GET /user/:id/orders/:orderId (Get an order by ID)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    const orderId = '64c0a6f29e9b9b18bcae5678'; // Replace with a valid Order ID
    const response = await request(app.getHttpServer())
      .get(`/user/${userId}/orders/${orderId}`)
      .expect(200);
    expect(response.body).toHaveProperty('orderId', orderId);
  });

  it('PUT /user/:id/orders/:orderId (Update an order)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    const orderId = '64c0a6f29e9b9b18bcae5678'; // Replace with a valid Order ID
    const updatePayload = {
      foodItems: [{ itemName: 'Burger', quantity: 1, price: 10 }],
      totalAmount: 10,
    };
    const response = await request(app.getHttpServer())
      .put(`/user/${userId}/orders/${orderId}`)
      .send(updatePayload)
      .expect(200);
    expect(response.body.orders[0]).toMatchObject(updatePayload);
  });

  it('DELETE /user/:id/orders/:orderId (Cancel an order)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    const orderId = '64c0a6f29e9b9b18bcae5678'; // Replace with a valid Order ID
    await request(app.getHttpServer()).delete(`/user/${userId}/orders/${orderId}`).expect(200);
  });

  it('POST /user/:id/reservations (Reserve a table)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    const reservationPayload = {
      branch: 'Main Branch',
      tableNumber: 5,
      date: '2024-12-30T18:00:00.000Z',
      time: '18:00',
      numberOfGuests: 4,
    };
    const response = await request(app.getHttpServer())
      .post(`/user/${userId}/reservations`)
      .send(reservationPayload)
      .expect(201);
    expect(response.body.reservations[0]).toMatchObject(reservationPayload);
  });

  it('GET /user/:id/reservations/:reservationId (Get a reservation by ID)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    const reservationId = '64c0a6f29e9b9b18bcae5678'; // Replace with a valid Reservation ID
    const response = await request(app.getHttpServer())
      .get(`/user/${userId}/reservations/${reservationId}`)
      .expect(200);
    expect(response.body).toHaveProperty('_id', reservationId);
  });

  it('PUT /user/:id/reservations/:reservationId (Update a reservation)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    const reservationId = '64c0a6f29e9b9b18bcae5678'; // Replace with a valid Reservation ID
    const updatePayload = {
      tableNumber: 10,
      numberOfGuests: 6,
    };
    const response = await request(app.getHttpServer())
      .put(`/user/${userId}/reservations/${reservationId}`)
      .send(updatePayload)
      .expect(200);
    expect(response.body.reservations[0]).toMatchObject(updatePayload);
  });

  it('DELETE /user/:id/reservations/:reservationId (Cancel a reservation)', async () => {
    const userId = '676ff2ed1316c435cc0f0488'; // Replace with a valid ID
    const reservationId = '64c0a6f29e9b9b18bcae5678'; // Replace with a valid Reservation ID
    await request(app.getHttpServer())
      .delete(`/user/${userId}/reservations/${reservationId}`)
      .expect(200);
  });
});
