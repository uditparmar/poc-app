import { createMocks } from "node-mocks-http";
import filterJobs from "../pages/api/filter";

describe("/api/filter", () => {
  test("filter api call response", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await filterJobs(req, res);

    expect(res._getStatusCode()).toBe(200);
  });
});