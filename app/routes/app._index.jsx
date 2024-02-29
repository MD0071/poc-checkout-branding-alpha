import { json } from "@remix-run/node";
import { useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  BlockStack,
  InlineStack,
  Select,
  Box,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useState, useCallback, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
// import { CheckoutCustomization } from "./models";
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const prisma = new PrismaClient();
  const response2 = await admin.graphql(
    `#graphql
    query getcheckoutProfiles{
      checkoutProfiles(first: 20) {
        edges {
          node {
            id
            name
          }
        }
      }
    }`
  );
  const allUsers = await prisma.checkoutCustomization.findMany();
  const shop = await admin?.rest?.session?.shop;
  const data = await response2.json();
  return json({
    checkoutProfiles: data.data.checkoutProfiles.edges,
    allUsers: allUsers,
    shop: shop,
  });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const prisma = new PrismaClient();
  const requestBody = await request.text();
  const formData = new URLSearchParams(requestBody);
  const selected1 = formData.get("headingLevelOne");
  const selected1Width = formData.get("headingLevelOneWidth");
  const selected1LetterCase = formData.get("headingLevelOneLetterCase");
  const selected1Kerning = formData.get("headingLevelOneKerning");
  const selected2 = formData.get("headingLevelTwo");
  const selected2Width = formData.get("headingLevelTwoWidth");
  const selected2LetterCase = formData.get("headingLevelTwoLetterCase");
  const selected2Kerning = formData.get("headingLevelTwoKerning");
  const selected3 = formData.get("headingLevelThree");
  const selected3Width = formData.get("headingLevelThreeWidth");
  const selected3LetterCase = formData.get("headingLevelThreeLetterCase");
  const selected3Kerning = formData.get("headingLevelThreeKerning");
  const shop = formData.get("shop");
  const brandingid = formData.get("checkoputid");

  try {
    // const existingEntrys = await CheckoutCustomization.findOne({ brandingid });
    // console.log(existingEntrys, "⭐⭐⭐");
    // if (existingEntry) {
    //   existingEntry.customizations = { selected1, selected2, selected3, shop };
    //   const updatedEntry = await existingEntry.save();
    //   console.log("Data updated:", updatedEntry);
    // } else {
    //   const newEntry = new CheckoutCustomization({
    //     brandingid,
    //     customizations: { selected1, selected2, selected3, shop },
    //   });
    //   const result = await newEntry.save();
    //   console.log("Data inserted:", result);
    // }
    const existingEntry = await prisma.checkoutCustomization.findFirst({
      where: {
        brandingid: brandingid,
      },
    });

    if (existingEntry) {
      const updatedEntry = await prisma.checkoutCustomization.update({
        where: {
          id: existingEntry.id,
        },
        data: {
          customizations: {
            selected1,
            selected1Width,
            selected1LetterCase,
            selected1Kerning,
            selected2,
            selected2Width,
            selected2LetterCase,
            selected2Kerning,
            selected3,
            selected3Width,
            selected3LetterCase,
            selected3Kerning,
            shop,
          },
        },
      });

      console.log("Data updated:😅", updatedEntry);
    } else {
      const result = await prisma.checkoutCustomization.create({
        data: {
          brandingid,
          customizations: {
            selected1,
            selected1Width,
            selected1LetterCase,
            selected1Kerning,
            selected2,
            selected2Width,
            selected2LetterCase,
            selected2Kerning,
            selected3,
            selected3Width,
            selected3LetterCase,
            selected3Kerning,
            shop,
          },
        },
      });

      console.log("Data inserted:😥", result);
    }
    const response = await admin.graphql(
      `#graphql
      mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
        checkoutBrandingUpsert(
          checkoutBrandingInput: $checkoutBrandingInput
          checkoutProfileId: $checkoutProfileId
        ) {
          checkoutBranding {
            customizations {
              global {
                cornerRadius
                typography {
                  kerning
                  letterCase
                }
              }
              headingLevel1 {
                typography {
                  font
                  kerning
                  letterCase
                  size
                  weight
                }
              }
              headingLevel2 {
                typography {
                  font
                  kerning
                  letterCase
                  size
                  weight
                }
              }
              headingLevel3 {
                typography {
                  font
                  kerning
                  letterCase
                  size
                  weight
                }
              }
            }
          }
        }
      }`,
      {
        variables: {
          checkoutProfileId: brandingid,
          checkoutBrandingInput: {
            customizations: {
              global: {
                cornerRadius: "NONE",
                typography: {
                  letterCase: "LOWER",
                  kerning: "LOOSE",
                },
              },
              headingLevel1: {
                typography: {
                  font: "PRIMARY",
                  size: selected1,
                  weight: selected1Width,
                  letterCase: selected1LetterCase,
                  kerning: selected1Kerning,
                },
              },
              headingLevel2: {
                typography: {
                  font: "PRIMARY",
                  size: selected2,
                  weight: selected2Width,
                  letterCase: selected2LetterCase,
                  kerning: selected2Kerning,
                },
              },
              headingLevel3: {
                typography: {
                  font: "PRIMARY",
                  size: selected3,
                  weight: selected3Width,
                  letterCase: selected3LetterCase,
                  kerning: selected3Kerning,
                },
              },
            },
          },
        },
      }
    );
    const responseJson = await response.json();
    return json({
      product: responseJson,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    return json({ error: "Error inserting data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
export default function Index() {
  const nav = useNavigation();
  const { checkoutProfiles, allUsers, shop } = useLoaderData();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const [headingLevelOne, setHeadingLevelOne] = useState("BASE");
  const [headingLevelOneWidth, setHeadingLevelOneWidth] = useState("BASE");
  const [headingLevelOneLetterCase, setHeadingLevelOneLetterCase] =
    useState("NONE");
  const [headingLevelOneKerning, setHeadingLevelOneKerning] = useState("BASE");

  const [headingLevelTwo, setHeadingLevelTwo] = useState("BASE");
  const [headingLevelTwoWidth, setHeadingLevelTwoWidth] = useState("BASE");
  const [headingLevelTwoLetterCase, setHeadingLevelTwoLetterCase] =
    useState("NONE");
  const [headingLevelTwoKerning, setHeadingLevelTwoKerning] = useState("BASE");

  const [headingLevelThree, setHeadingLevelThree] = useState("BASE");
  const [headingLevelThreeWidth, setHeadingLevelThreeWidth] = useState("BASE");
  const [headingLevelThreeLetterCase, setHeadingLevelThreeLetterCase] =
    useState("NONE");
  const [headingLevelThreeKerning, setHeadingLevelThreeKerning] =
    useState("BASE");

  const [checkoputid, setCheckoputid] = useState(null);
  useEffect(() => {
    if (allUsers && allUsers.length > 0) {
      const userWithCheckoputid = allUsers.find(
        (user) => user.brandingid === checkoputid
      );

      if (userWithCheckoputid) {
        setHeadingLevelOne(userWithCheckoputid.customizations.selected1);
        setHeadingLevelOneWidth(
          userWithCheckoputid.customizations.selected1Width
        );
        setHeadingLevelOneLetterCase(
          userWithCheckoputid.customizations.selected3LetterCase
        );
        setHeadingLevelOneKerning(
          userWithCheckoputid.customizations.selected3Kerning
        );

        setHeadingLevelTwo(userWithCheckoputid.customizations.selected2);
        setHeadingLevelTwoWidth(
          userWithCheckoputid.customizations.selected2Width
        );
        setHeadingLevelTwoLetterCase(
          userWithCheckoputid.customizations.selected3LetterCase
        );
        setHeadingLevelTwoKerning(
          userWithCheckoputid.customizations.selected3Kerning
        );

        setHeadingLevelThree(userWithCheckoputid.customizations.selected3);
        setHeadingLevelThreeWidth(
          userWithCheckoputid.customizations.selected3Width
        );
        setHeadingLevelThreeLetterCase(
          userWithCheckoputid.customizations.selected3LetterCase
        );
        setHeadingLevelThreeKerning(
          userWithCheckoputid.customizations.selected3Kerning
        );
      } else {
        // If the checkoputid doesn't match any user, set defaults
        setHeadingLevelOne("BASE");
        setHeadingLevelOneWidth("BASE");
        setHeadingLevelOneLetterCase("NONE");
        setHeadingLevelOneKerning("BASE");

        setHeadingLevelTwo("BASE");
        setHeadingLevelTwoWidth("BASE");
        setHeadingLevelTwoLetterCase("NONE");
        setHeadingLevelTwoKerning("BASE");

        setHeadingLevelThree("BASE");
        setHeadingLevelThreeWidth("BASE");
        setHeadingLevelThreeLetterCase("NONE");
        setHeadingLevelThreeKerning("BASE");
      }
    }
  }, [allUsers, checkoputid]);
  const handleHeadingLevelOne = useCallback(
    (value) => setHeadingLevelOne(value),
    []
  );
  const handleHeadingLevelOneWidth = useCallback(
    (value) => setHeadingLevelOneWidth(value),
    []
  );
  const handleHeadingLevelOneLetterCase = useCallback(
    (value) => setHeadingLevelOneLetterCase(value),
    []
  );
  const handleHeadingLevelOneKerning = useCallback(
    (value) => setHeadingLevelOneKerning(value),
    []
  );

  const handleHeadingLevelTwo = useCallback(
    (value) => setHeadingLevelTwo(value),
    []
  );
  const handleHeadingLevelTwoWidth = useCallback(
    (value) => setHeadingLevelTwoWidth(value),
    []
  );
  const handleHeadingLevelTwoLetterCase = useCallback(
    (value) => setHeadingLevelTwoLetterCase(value),
    []
  );
  const handleHeadingLevelTwoKerning = useCallback(
    (value) => setHeadingLevelTwoKerning(value),
    []
  );

  const handleHeadingLevelThree = useCallback(
    (value) => setHeadingLevelThree(value),
    []
  );
  const handleHeadingLevelThreeWidth = useCallback(
    (value) => setHeadingLevelThreeWidth(value),
    []
  );
  const handleHeadingLevelThreeLetterCase = useCallback(
    (value) => setHeadingLevelThreeLetterCase(value),
    []
  );
  const handleHeadingLevelThreeKerning = useCallback(
    (value) => setHeadingLevelThreeKerning(value),
    []
  );

  const handlecheckoutid = useCallback((value) => setCheckoputid(value), []);
  const checkoutid = checkoutProfiles.map((profile) => {
    const idWithoutPrefix = profile.node.id.replace(
      "gid://shopify/CheckoutProfile/",
      ""
    );
    return {
      label: `${profile.node.name} (${idWithoutPrefix})`,
      value: profile.node.id,
    };
  });
  const headinglevel1 = [
    { label: "BASE", value: "BASE" },
    { label: "EXTRA_EXTRA_LARGE", value: "EXTRA_EXTRA_LARGE" },
    { label: "EXTRA_LARGE", value: "EXTRA_LARGE" },
    { label: "EXTRA_SMALL", value: "EXTRA_SMALL" },
    { label: "LARGE", value: "LARGE" },
    { label: "MEDIUM", value: "MEDIUM" },
    { label: "SMALL", value: "SMALL" },
  ];
  const headinglevel1Width = [
    { label: "BASE", value: "BASE" },
    { label: "BOLD", value: "BOLD" },
  ];
  const headinglevel1LetterCase = [
    { label: "NONE", value: "NONE" },
    { label: "LOWER", value: "LOWER" },
    { label: "TITLE", value: "TITLE" },
    { label: "UPPER", value: "UPPER" },
  ];
  const headinglevel1Kerning = [
    { label: "BASE", value: "BASE" },
    { label: "EXTRA_LOOSE", value: "EXTRA_LOOSE" },
    { label: "LOOSE", value: "LOOSE" },
  ];

  const headinglevel2 = [
    { label: "BASE", value: "BASE" },
    { label: "EXTRA_EXTRA_LARGE", value: "EXTRA_EXTRA_LARGE" },
    { label: "EXTRA_LARGE", value: "EXTRA_LARGE" },
    { label: "EXTRA_SMALL", value: "EXTRA_SMALL" },
    { label: "LARGE", value: "LARGE" },
    { label: "MEDIUM", value: "MEDIUM" },
    { label: "SMALL", value: "SMALL" },
  ];
  const headinglevel2Width = [
    { label: "BASE", value: "BASE" },
    { label: "BOLD", value: "BOLD" },
  ];
  const headinglevel2LetterCase = [
    { label: "NONE", value: "NONE" },
    { label: "LOWER", value: "LOWER" },
    { label: "TITLE", value: "TITLE" },
    { label: "UPPER", value: "UPPER" },
  ];
  const headinglevel2Kerning = [
    { label: "BASE", value: "BASE" },
    { label: "EXTRA_LOOSE", value: "EXTRA_LOOSE" },
    { label: "LOOSE", value: "LOOSE" },
  ];

  const headinglevel3 = [
    { label: "BASE", value: "BASE" },
    { label: "EXTRA_EXTRA_LARGE", value: "EXTRA_EXTRA_LARGE" },
    { label: "EXTRA_LARGE", value: "EXTRA_LARGE" },
    { label: "EXTRA_SMALL", value: "EXTRA_SMALL" },
    { label: "LARGE", value: "LARGE" },
    { label: "MEDIUM", value: "MEDIUM" },
    { label: "SMALL", value: "SMALL" },
  ];
  const headinglevel3Width = [
    { label: "BASE", value: "BASE" },
    { label: "BOLD", value: "BOLD" },
  ];
  const headinglevel3LetterCase = [
    { label: "NONE", value: "NONE" },
    { label: "LOWER", value: "LOWER" },
    { label: "TITLE", value: "TITLE" },
    { label: "UPPER", value: "UPPER" },
  ];
  const headinglevel3Kerning = [
    { label: "BASE", value: "BASE" },
    { label: "EXTRA_LOOSE", value: "EXTRA_LOOSE" },
    { label: "LOOSE", value: "LOOSE" },
  ];

  const generateProduct = () =>
    submit(
      {
        headingLevelOne,
        headingLevelOneWidth,
        headingLevelOneLetterCase,
        headingLevelOneKerning,
        headingLevelTwo,
        headingLevelTwoWidth,
        headingLevelTwoLetterCase,
        headingLevelTwoKerning,
        headingLevelThree,
        headingLevelThreeWidth,
        headingLevelThreeLetterCase,
        headingLevelThreeKerning,
        checkoputid,
        shop,
      },
      { replace: true, method: "POST" }
    );
  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Box padding="400">
              <Select
                label="Select Checkout profile"
                options={checkoutid}
                onChange={handlecheckoutid}
                value={checkoputid}
              />
            </Box>
            <BlockStack gap="500">
              <Card>
                <Select
                  label="Heading level 1"
                  options={headinglevel1}
                  onChange={handleHeadingLevelOne}
                  value={headingLevelOne}
                />
                <Select
                  label="Heading level 1 Width"
                  options={headinglevel1Width}
                  onChange={handleHeadingLevelOneWidth}
                  value={headingLevelOneWidth}
                />
                <Select
                  label="Heading level 1 LetterCase"
                  options={headinglevel1LetterCase}
                  onChange={handleHeadingLevelOneLetterCase}
                  value={headingLevelOneLetterCase}
                />
                <Select
                  label="Heading level 1 Kerning"
                  options={headinglevel1Kerning}
                  onChange={handleHeadingLevelOneKerning}
                  value={headingLevelOneKerning}
                />
              </Card>
              <Card>
                <Select
                  label="Heading level 2"
                  options={headinglevel2}
                  onChange={handleHeadingLevelTwo}
                  value={headingLevelTwo}
                />
                <Select
                  label="Heading level 2 Width"
                  options={headinglevel2Width}
                  onChange={handleHeadingLevelTwoWidth}
                  value={headingLevelTwoWidth}
                />
                <Select
                  label="Heading level 2 LetterCase"
                  options={headinglevel2LetterCase}
                  onChange={handleHeadingLevelTwoLetterCase}
                  value={headingLevelTwoLetterCase}
                />
                <Select
                  label="Heading level 2 Kerning"
                  options={headinglevel2Kerning}
                  onChange={handleHeadingLevelTwoKerning}
                  value={headingLevelTwoKerning}
                />
              </Card>
              <Card>
                <Select
                  label="Heading level 3"
                  options={headinglevel3}
                  onChange={handleHeadingLevelThree}
                  value={headingLevelThree}
                />
                <Select
                  label="Heading level 3 Width"
                  options={headinglevel3Width}
                  onChange={handleHeadingLevelThreeWidth}
                  value={headingLevelThreeWidth}
                />
                <Select
                  label="Heading level 3 LetterCase"
                  options={headinglevel3LetterCase}
                  onChange={handleHeadingLevelThreeLetterCase}
                  value={headingLevelThreeLetterCase}
                />
                <Select
                  label="Heading level 3 Kerning"
                  options={headinglevel3Kerning}
                  onChange={handleHeadingLevelThreeKerning}
                  value={headingLevelThreeKerning}
                />
              </Card>

              <InlineStack gap="300">
                <Button loading={isLoading} onClick={generateProduct}>
                  Change
                </Button>
              </InlineStack>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
