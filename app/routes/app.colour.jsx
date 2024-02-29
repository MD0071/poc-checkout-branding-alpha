import { json } from "@remix-run/node";
import { useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Button,
  BlockStack,
  InlineStack,
  Select,
  Box,
  Card,
  TextField,
  ExceptionList,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useState, useCallback } from "react";
import { PrismaClient } from "@prisma/client";
// import { CheckoutCustomization } from "./models";
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  //   const prisma = new PrismaClient();
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
  //   const allUsers = await prisma.checkoutCustomization.findMany();
  const shop = await admin?.rest?.session?.shop;
  const data = await response2.json();
  return json({
    checkoutProfiles: data.data.checkoutProfiles.edges,
    // allUsers: allUsers,
    shop: shop,
  });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const prisma = new PrismaClient();
  const requestBody = await request.text();
  const formData = new URLSearchParams(requestBody);

  //   const shop = formData.get("shop");
  const brandingid = formData.get("checkoputid");
  const schemeonevalue = formData.get("schemeonevalue");
  const schemeonetextvalue = formData.get("schemeonetextvalue");
  const schemeonebordervalue = formData.get("schemeonebordervalue");
  const schemeoneiconvalue = formData.get("schemeoneiconvalue");
  const schemeoneaccentvalue = formData.get("schemeoneaccentvalue");
  const schemeonedecorativevalue = formData.get("schemeonedecorativevalue");
  const schemeonecontrolvalue = formData.get("schemeonecontrolvalue");
  const schemeonecontrolbackgroundvalue = formData.get(
    "schemeonecontrolbackgroundvalue"
  );
  const schemeonecontrolbordervalue = formData.get(
    "schemeonecontrolbordervalue"
  );
  const schemeonecontroldecorativevalue = formData.get(
    "schemeonecontroldecorativevalue"
  );
  const schemeonecontroliconvalue = formData.get("schemeonecontroliconvalue");
  const schemeonecontroltextvalue = formData.get("schemeonecontroltextvalue");

  const schemeonecontrolselectedbackgroundvalue = formData.get(
    "schemeonecontrolselectedbackgroundvalue"
  );
  const schemeonecontrolselectedtextvalue = formData.get(
    "schemeonecontrolselectedtextvalue"
  );
  const schemeonecontrolselectedbordervalue = formData.get(
    "schemeonecontrolselectedbordervalue"
  );
  const schemeonecontrolselectediconvalue = formData.get(
    "schemeonecontrolselectediconvalue"
  );
  const schemeonecontrolselectedaccentvalue = formData.get(
    "schemeonecontrolselectedaccentvalue"
  );
  const schemeonecontrolselecteddecorativevalue = formData.get(
    "schemeonecontrolselecteddecorativevalue"
  );

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
            designSystem {
                colors {
                schemes {
                    scheme1 {
                    base {
                        accent
                        background
                        border
                        decorative
                        icon
                        text
                    }
                    control{
                        accent
                        background
                        border
                        decorative
                        icon
                        selected{
                        accent
                        background
                        border
                        decorative
                        icon
                        text
                        }
                        text
                    }
                    primaryButton{
                        accent
                        background
                        border
                        decorative
                        hover{
                        accent
                        background
                        border
                        decorative
                        icon
                        text
                        }
                        icon
                        text
                    }
                    secondaryButton{
                        accent
                        background
                        border
                        decorative
                        hover{
                        accent
                        background
                        border
                        decorative
                        icon
                        text
                        }
                        icon
                        text
                    }
                    }
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
            designSystem: {
              colors: {
                schemes: {
                  scheme1: {
                    base: {
                      background: schemeonevalue,
                      text: schemeonetextvalue,
                      border: schemeonebordervalue,
                      icon: schemeoneiconvalue,
                      accent: schemeoneaccentvalue,
                      decorative: schemeonedecorativevalue,
                    },
                    control: {
                      background: schemeonecontrolbackgroundvalue,
                      text: schemeonecontroltextvalue,
                      border: schemeonecontrolbordervalue,
                      icon: schemeonecontroliconvalue,
                      accent: schemeonecontrolvalue,
                      decorative: schemeonecontroldecorativevalue,
                      selected: {
                        background: schemeonecontrolselectedbackgroundvalue,
                        text: schemeonecontrolselectedtextvalue,
                        border: schemeonecontrolselectedbordervalue,
                        icon: schemeonecontrolselectediconvalue,
                        accent: schemeonecontrolselectedaccentvalue,
                        decorative: schemeonecontrolselecteddecorativevalue,
                      },
                    },
                    primaryButton: {
                      background: "",
                      text: "",
                      border: "",
                      icon: "",
                      accent: "",
                      decorative: "",
                      hover: {
                        background: "",
                        text: "",
                        border: "",
                        icon: "",
                        accent: "",
                        decorative: "",
                      },
                    },
                    secondaryButton: {
                      background: "",
                      text: "",
                      border: "",
                      icon: "",
                      accent: "",
                      decorative: "",
                      hover: {
                        background: "",
                        text: "",
                        border: "",
                        icon: "",
                        accent: "",
                        decorative: "",
                      },
                    },
                  },
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
  const { checkoutProfiles, shop } = useLoaderData();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";

  const [checkoputid, setCheckoputid] = useState(null);
  const [schemeonevalue, setSchemeoneValue] = useState();
  const [schemeonetextvalue, setSchemeonetextvalue] = useState("");
  const [schemeonebordervalue, setSchemeonebordervalue] = useState("");
  const [schemeoneiconvalue, setSchemeoneiconvalue] = useState("");
  const [schemeoneaccentvalue, setSchemeoneaccentvalue] = useState("");
  const [schemeonedecorativevalue, setSchemeonedecorativevalue] = useState("");
  const [schemeonecontrolvalue, setSchemeonecontrolvalue] = useState("");
  const [schemeonecontrolbackgroundvalue, setSchemeonecontrolbackgroundvalue] =
    useState("");
  const [schemeonecontrolbordervalue, setSchemeonecontrolbordervalue] =
    useState("");
  const [schemeonecontroldecorativevalue, setSchemeonecontroldecorativevalue] =
    useState("");
  const [schemeonecontroliconvalue, setSchemeonecontroliconvalue] =
    useState("");
  const [schemeonecontroltextvalue, setSchemeonecontroltextvalue] =
    useState("");
  const [
    schemeonecontrolselectedbackgroundvalue,
    setSchemeonecontrolselectedbackgroundvalue,
  ] = useState("");
  const [
    schemeonecontrolselectedtextvalue,
    setSchemeonecontrolselectedtextvalue,
  ] = useState("");
  const [
    schemeonecontrolselectedbordervalue,
    setSchemeonecontrolselectedbordervalue,
  ] = useState("");
  const [
    schemeonecontrolselectediconvalue,
    setSchemeonecontrolselectediconvalue,
  ] = useState("");
  const [
    schemeonecontrolselectedaccentvalue,
    setSchemeonecontrolselectedaccentvalue,
  ] = useState("");
  const [
    schemeonecontrolselecteddecorativevalue,
    setSchemeonecontrolselecteddecorativevalue,
  ] = useState("");
  const handleschemeonecontrolselectedbackgroundChange = useCallback(
    (newValue) => setSchemeonecontrolselectedbackgroundvalue(newValue),
    []
  );
  const handleschemeonecontrolselectedtextChange = useCallback(
    (newValue) => setSchemeonecontrolselectedtextvalue(newValue),
    []
  );
  const handleschemeonecontrolselectedborderChange = useCallback(
    (newValue) => setSchemeonecontrolselectedbordervalue(newValue),
    []
  );
  const handleschemeonecontroltexticonChange = useCallback(
    (newValue) => setSchemeonecontrolselectediconvalue(newValue),
    []
  );
  const handleschemeonecontroltextaccentChange = useCallback(
    (newValue) => setSchemeonecontrolselectedaccentvalue(newValue),
    []
  );
  const handleschemeonecontrolselecteddecorativeChange = useCallback(
    (newValue) => setSchemeonecontrolselecteddecorativevalue(newValue),
    []
  );
  const handleschemeoneChange = useCallback(
    (newValue) => setSchemeoneValue(newValue),
    []
  );
  const handleschemeonetextChange = useCallback(
    (newValue) => setSchemeonetextvalue(newValue),
    []
  );
  const handleschemeoneborderChange = useCallback(
    (newValue) => setSchemeonebordervalue(newValue),
    []
  );
  const handleschemeoneiconChange = useCallback(
    (newValue) => setSchemeoneiconvalue(newValue),
    []
  );
  const handleschemeoneaccentChange = useCallback(
    (newValue) => setSchemeoneaccentvalue(newValue),
    []
  );
  const handleschemeonedecorativeChange = useCallback(
    (newValue) => setSchemeonedecorativevalue(newValue),
    []
  );
  const handleschemeonecontrolChange = useCallback(
    (newValue) => setSchemeonecontrolvalue(newValue),
    []
  );
  const handleschemeonecontrolbackgroundChange = useCallback(
    (newValue) => setSchemeonecontrolbackgroundvalue(newValue),
    []
  );
  const handleschemeonecontrolborderChange = useCallback(
    (newValue) => setSchemeonecontrolbordervalue(newValue),
    []
  );
  const handleschemeonecontroldecorativeChange = useCallback(
    (newValue) => setSchemeonecontroldecorativevalue(newValue),
    []
  );
  const handleschemeonecontroliconChange = useCallback(
    (newValue) => setSchemeonecontroliconvalue(newValue),
    []
  );
  const handleschemeonecontroltextChange = useCallback(
    (newValue) => setSchemeonecontroltextvalue(newValue),
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

  const generateProduct = () =>
    submit(
      {
        schemeonevalue,
        checkoputid,
        schemeonetextvalue,
        schemeonebordervalue,
        schemeoneiconvalue,
        schemeoneaccentvalue,
        schemeonedecorativevalue,
        schemeonecontrolvalue,
        schemeonecontrolbackgroundvalue,
        schemeonecontrolbordervalue,
        schemeonecontroldecorativevalue,
        schemeonecontroliconvalue,
        schemeonecontroltextvalue,
        schemeonecontrolselectedbackgroundvalue,
        schemeonecontrolselectedtextvalue,
        schemeonecontrolselectedbordervalue,
        schemeonecontrolselectediconvalue,
        schemeonecontrolselectedaccentvalue,
        schemeonecontrolselecteddecorativevalue,
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
            <Card>
              <ExceptionList
                items={[
                  {
                    description: "scheme1 base",
                  },
                ]}
              />
              <TextField
                label="scheme1 Background"
                value={schemeonevalue}
                onChange={handleschemeoneChange}
                autoComplete="off"
              />
              <TextField
                label="scheme1 Text"
                value={schemeonetextvalue}
                onChange={handleschemeonetextChange}
                autoComplete="off"
              />
              <TextField
                label="scheme1 border"
                value={schemeonebordervalue}
                onChange={handleschemeoneborderChange}
                autoComplete="off"
              />
              <TextField
                label="scheme1 icon"
                value={schemeoneiconvalue}
                onChange={handleschemeoneiconChange}
                autoComplete="off"
              />
              <TextField
                label="scheme1 accent"
                value={schemeoneaccentvalue}
                onChange={handleschemeoneaccentChange}
                autoComplete="off"
              />
              <TextField
                label="scheme1 decorative"
                value={schemeonedecorativevalue}
                onChange={handleschemeonedecorativeChange}
                autoComplete="off"
              />
            </Card>
            <Card>
              <ExceptionList
                items={[
                  {
                    description: "scheme1 control",
                  },
                ]}
              />
              <TextField
                label="scheme1 control accent"
                value={schemeonecontrolvalue}
                onChange={handleschemeonecontrolChange}
                autoComplete="off"
              />
              <TextField
                label="scheme1 background"
                value={schemeonecontrolbackgroundvalue}
                onChange={handleschemeonecontrolbackgroundChange}
                autoComplete="off"
              />
              <TextField
                label="scheme1 control border"
                value={schemeonecontrolbordervalue}
                onChange={handleschemeonecontrolborderChange}
                autoComplete="off"
              />
              <TextField
                label="scheme1 control decorative"
                value={schemeonecontroldecorativevalue}
                onChange={handleschemeonecontroldecorativeChange}
                autoComplete="off"
              />
              <TextField
                label="scheme1 control icon"
                value={schemeonecontroliconvalue}
                onChange={handleschemeonecontroliconChange}
                autoComplete="off"
              />
              <TextField
                label="scheme1 control text"
                value={schemeonecontroltextvalue}
                onChange={handleschemeonecontroltextChange}
                autoComplete="off"
              />
              <Card>
                <ExceptionList
                  items={[
                    {
                      description: "scheme1 control selected",
                    },
                  ]}
                />
                <TextField
                  label="scheme1 control background"
                  value={schemeonecontrolselectedbackgroundvalue}
                  onChange={handleschemeonecontrolselectedbackgroundChange}
                  autoComplete="off"
                />
                <TextField
                  label="scheme1 control selected text"
                  value={schemeonecontrolselectedtextvalue}
                  onChange={handleschemeonecontrolselectedtextChange}
                  autoComplete="off"
                />
                <TextField
                  label="scheme1 control selected border"
                  value={schemeonecontrolselectedbordervalue}
                  onChange={handleschemeonecontrolselectedborderChange}
                  autoComplete="off"
                />
                <TextField
                  label="scheme1 control selected icon"
                  value={schemeonecontrolselectediconvalue}
                  onChange={handleschemeonecontroltexticonChange}
                  autoComplete="off"
                />
                <TextField
                  label="scheme1 control selected accent"
                  value={schemeonecontrolselectedaccentvalue}
                  onChange={handleschemeonecontroltextaccentChange}
                  autoComplete="off"
                />
                <TextField
                  label="scheme1 control selected decorative"
                  value={schemeonecontrolselecteddecorativevalue}
                  onChange={handleschemeonecontrolselecteddecorativeChange}
                  autoComplete="off"
                />
              </Card>
            </Card>
            <BlockStack gap="500">
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
