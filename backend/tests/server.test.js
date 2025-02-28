import assert from "node:assert";
import request from "supertest";

import config from "../../config.js";
import { sequelize } from "../db.js";
import { emptyDatabase, addArtworks } from "../populateDataBase.js";
import { start } from "../server.js";

// Running these tests works only when using the experimental ECMAScript Modules support: https://jestjs.io/docs/ecmascript-modules

const timeOut = 60000;

const requestData = async (queryData) =>
  await request(config.SERVER_URL).post("/").send(queryData);

const fetchItems = async (sortBy = "title", first = 20, after = null) => {
  const query = `
    query AllArtWorks($sortBy: String, $first: Int, $after: ID) {
      allArtWorks(sortBy: $sortBy, first: $first, after: $after) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        totalCount
        edges {
          cursor
          node {
            id
            title
            artist
            image {
              type
              width
              height
              uri
            }
            description
            averageRating
            startingPrice
            sizes {
              width
              height
              price
            }
            reviews {
              name
              date
              rating
              text
            }
          }
        }
      }
    }
  `;
  const response = await requestData({
    query,
    variables: { sortBy, first, after },
  });
  console.log("Response: ", response.body);
  return response.body.data.allArtWorks;
};

describe("Server tests", () => {
  let testServer;
  beforeAll(async () => {
    testServer = await start();
  }, timeOut);

  afterAll(async () => {
    await testServer.stop();
    await sequelize.close();
  }, timeOut);

  describe("Items tests", () => {
    beforeEach(async () => {
      await emptyDatabase();
      await addArtworks();
    }, timeOut);

    it("Count all items", async () => {
      const response = await requestData({
        query: `query Query {
          artWorksCount
        }`,
      });
      expect(response.errors).toBeUndefined();
      assert.strictEqual(response.body.data.artWorksCount, 31);
    });

    it("Handles cursor-based pagination correctly", async () => {
      const firstPage = await fetchItems("", 20, null);
      expect(firstPage.edges.length).toBe(20);
      expect(firstPage.edges[0].node.id).toBe("1");
      expect(firstPage.pageInfo.endCursor).toBeDefined();
      expect(firstPage.pageInfo.hasNextPage).toBe(true);

      const secondPage = await fetchItems("", 20, firstPage.pageInfo.endCursor);
      expect(secondPage.edges.length).toBe(11);
      expect(secondPage.edges[0].node.id).toBe("21");
      expect(secondPage.edges[0].cursor).not.toEqual(
        firstPage.pageInfo.endCursor
      );
    });
  });
});
