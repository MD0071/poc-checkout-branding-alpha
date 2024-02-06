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
  ButtonGroup,
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
  const cornerRadius = formData.get("cornerRadius");
  const controlCorner = formData.get("controlCorner");
  const controlBorder = formData.get("controlBorder");
  const controLabelPosition = formData.get("controLabelPosition");
  const merchandiseThumbnailBorder = formData.get("merchandiseThumbnailBorder");
  const merchandiseThumbnailCornerRadius = formData.get(
    "merchandiseThumbnailCornerRadius"
  );
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
    // const existingEntry = await prisma.checkoutCustomization.findFirst({
    //   where: {
    //     brandingid: brandingid,
    //   },
    // });

    // if (existingEntry) {
    //   const updatedEntry = await prisma.checkoutCustomization.update({
    //     where: {
    //       id: existingEntry.id,
    //     },
    //     data: {
    //       customizations: {
    //         cornerRadius,
    //         shop,
    //       },
    //     },
    //   });

    //   console.log("Data updated:😅", updatedEntry);
    // } else {
    //   const result = await prisma.checkoutCustomization.create({
    //     data: {
    //       brandingid,
    //       customizations: {
    //         cornerRadius,
    //         shop,
    //       },
    //     },
    //   });

    //   console.log("Data inserted:😥", result);
    // }
    const response = await admin.graphql(
      `#graphql
      mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
        checkoutBrandingUpsert(
          checkoutBrandingInput: $checkoutBrandingInput
          checkoutProfileId: $checkoutProfileId
        ) {
          checkoutBranding {
            customizations {
              checkbox {
                  cornerRadius
                }
                choiceList {
                  group {
                    spacing
                  }
                }
                control {
                  border
                  cornerRadius
                  labelPosition
                }
                header {
                  alignment
                }
                merchandiseThumbnail {
                  border
                  cornerRadius
                }
                primaryButton {
                  background
                  blockPadding
                  border
                  cornerRadius
                  inlinePadding
                  typography {
                    font
                    kerning
                    size
                    weight
                    letterCase
                  }
                }
                secondaryButton {
                  background
                  blockPadding
                  border
                  cornerRadius
                  inlinePadding
                  typography {
                    font
                    kerning
                    size
                    weight
                    letterCase
                  }
                }
                select {
                  border
                  typography {
                    font
                    kerning
                    size
                    weight
                    letterCase
                  }
                }
                textField {
                  border
                  typography {
                    font
                    kerning
                    size
                    weight
                    letterCase
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
              checkbox: {
                cornerRadius: cornerRadius,
              },
              choiceList: {
                group: {
                  spacing: "NONE",
                },
              },
              control: {
                cornerRadius: controlCorner,
                border: controlBorder,
                labelPosition: controLabelPosition,
              },
              merchandiseThumbnail: {
                border: merchandiseThumbnailBorder,
                cornerRadius: merchandiseThumbnailCornerRadius,
              },
              primaryButton: {
                background: "NONE",
                border: "NONE",
                cornerRadius: "NONE",
                blockPadding: "NONE",
                inlinePadding: "NONE",
                typography: {
                  font: "PRIMARY",
                  size: "EXTRA_SMALL",
                  weight: "BASE",
                  letterCase: "LOWER",
                  kerning: "BASE",
                },
              },
              secondaryButton: {
                background: "NONE",
                border: "NONE",
                cornerRadius: "NONE",
                blockPadding: "NONE",
                inlinePadding: "NONE",
                typography: {
                  font: "PRIMARY",
                  size: "EXTRA_SMALL",
                  weight: "BASE",
                  letterCase: "LOWER",
                  kerning: "BASE",
                },
              },
              select: {
                border: "NONE",
                typography: {
                  font: "PRIMARY",
                  size: "EXTRA_SMALL",
                  weight: "BASE",
                  letterCase: "LOWER",
                  kerning: "BASE",
                },
              },
              textField: {
                border: "NONE",
                typography: {
                  font: "PRIMARY",
                  size: "EXTRA_SMALL",
                  weight: "BASE",
                  letterCase: "LOWER",
                  kerning: "BASE",
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
export default function AdditionalPage() {
  const nav = useNavigation();
  const { checkoutProfiles, allUsers, shop } = useLoaderData();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const [cornerRadius, setCornerRadius] = useState("BASE");
  const [checkoputid, setCheckoputid] = useState(null);
  const [controlCorner, setControlCorner] = useState("BASE");
  const [controlBorder, setControlBorder] = useState("");
  const [controLabelPosition, setControlLabelPosition] = useState("");
  const [
    merchandiseThumbnailCornerRadius,
    setMerchandiseThumbnailCornerRadius,
  ] = useState("");
  const [merchandiseThumbnailBorder, setMerchandiseThumbnailBorder] =
    useState("");
  // useEffect(() => {
  //   if (allUsers && allUsers.length > 0) {
  //     const userWithCheckoputid = allUsers.find(
  //       (user) => user.brandingid === checkoputid
  //     );

  //     if (userWithCheckoputid) {
  //       setCornerRadius(userWithCheckoputid.customizations.setCornerRadius);
  //     } else {
  //       setCornerRadius("BASE");
  //     }
  //   }
  // }, [allUsers, checkoputid]);
  const handlecornerRadius = useCallback((value) => setCornerRadius(value), []);
  const handlemerchandiseThumbnailBorder = useCallback(
    (value) => setMerchandiseThumbnailBorder(value),
    []
  );
  const handlecontrol = useCallback((value) => setControlCorner(value), []);
  const handleControlBorder = useCallback(
    (value) => setControlBorder(value),
    []
  );
  const handlecontroLabelPosition = useCallback(
    (value) => setControlLabelPosition(value),
    []
  );
  const handleMerchandiseThumbnailCornerRadius = useCallback(
    (value) => setMerchandiseThumbnailCornerRadius(value),
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
  const cornerRadiusoption = [
    { label: "BASE", value: "BASE" },
    { label: "LARGE", value: "LARGE" },
    { label: "NONE", value: "NONE" },
    { label: "SMALL", value: "SMALL" },
  ];
  const controlBorderoption = [
    { label: "NONE", value: "NONE" },
    { label: "FULL", value: "FULL" },
  ];
  const controLabelPositionoption = [
    { label: "INSIDE", value: "INSIDE" },
    { label: "OUTSIDE", value: "OUTSIDE" },
  ];
  const optionMerchandiseThumbnailCornerRadius = [
    { label: "BASE", value: "BASE" },
    { label: "LARGE", value: "LARGE" },
    { label: "NONE", value: "NONE" },
    { label: "SMALL", value: "SMALL" },
  ];

  const generateProduct = () =>
    submit(
      {
        controlCorner,
        cornerRadius,
        checkoputid,
        controlBorder,
        controLabelPosition,
        shop,
        merchandiseThumbnailBorder,
        merchandiseThumbnailCornerRadius,
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
                  label="checkbox cornerRadius"
                  options={cornerRadiusoption}
                  onChange={handlecornerRadius}
                  value={cornerRadius}
                />
              </Card>
              <Card>
                <Select
                  label="control cornerRadius"
                  options={cornerRadiusoption}
                  onChange={handlecontrol}
                  value={controlCorner}
                />
                <Select
                  label="control cornerRadius"
                  options={controlBorderoption}
                  onChange={handleControlBorder}
                  value={controlBorder}
                />
                <Select
                  label="control cornerRadius"
                  options={controLabelPositionoption}
                  onChange={handlecontroLabelPosition}
                  value={controLabelPosition}
                />
              </Card>
              <Card>
                <Select
                  label="Merchandise Thumbnail border"
                  options={controlBorderoption}
                  onChange={handlemerchandiseThumbnailBorder}
                  value={merchandiseThumbnailBorder}
                />
                <Select
                  label="Merchandise Thumbnail Corner Radius"
                  options={optionMerchandiseThumbnailCornerRadius}
                  onChange={handleMerchandiseThumbnailCornerRadius}
                  value={merchandiseThumbnailCornerRadius}
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
