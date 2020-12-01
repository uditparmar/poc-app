import { createMocks } from "node-mocks-http";
import filterData from "../pages/api/job";

describe("/api/job", () => {
  test("job api call response", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await filterData(req, res);

    expect(res._getStatusCode()).toBe(200);
  });
});
