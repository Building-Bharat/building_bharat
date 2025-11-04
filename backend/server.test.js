const supertest = require('supertest');
const app = require('./app'); // Import app.js, NOT server.js
const request = supertest(app);

let otp;

describe("Auth Flow", () => {
  
  // Test Signup via email
  describe("POST /api/v1/auth/signup/email", () => {
    test("Should respond with 201 when valid data is provided", async () => {
      const response = await request
        .post("/api/v1/auth/signup/email")
        .send({
          name: "Test User 6",
          email: "supersetTest6@example.com",
          password: "Agnivo@2006",
          passwordConfirm: "Agnivo@2006",
        })

      // Optional debug if something fails
      // console.log(response.body);

      otp = response.body.otp;

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("message"); // optional check
    });
  });

  //  Test OTP Verification
  describe("POST /api/v1/auth/verify-otp", () => {
    test("Should respond with 200 when valid email and otp are provided", async () => {
      const response = await request
        .post("/api/v1/auth/verify-otp")
        .send({
          email: "supersetTest5@example.com",
          otp, // You can mock or hardcode this for testing
        });

      // Optional: log response for debugging
      // console.log(response.body);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
    });

    test("Should respond with 400 when OTP is invalid", async () => {
      const response = await request
        .post("/api/v1/auth/verify-otp")
        .send({
          email: "testuser@example.com",
          otp: "999999", // invalid OTP
        });

      expect(response.statusCode).toBe(400);
    });
  });
});


