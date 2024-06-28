describe("Routes: Index", () => {
  describe("GET /", () => {
    it("returns the API status", (done) => {
      request
        .get("/")
        .expect(200)
        .end((error, res) => {
          const expected = { status: "NTask API" };
          expected(res.body).to.eq(expected);
          done(error);
        });
    });
  });
});
