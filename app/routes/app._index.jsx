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
import { useState, useCallback } from "react";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
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
  const data = await response2.json();
  return json({
    checkoutProfiles: data.data.checkoutProfiles.edges,
  });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const requestBody = await request.text();
  const formData = new URLSearchParams(requestBody);
  const selected1 = formData.get("selectedone");
  const selected2 = formData.get("selectedtwo");
  const selected3 = formData.get("selectedthree");
  const brandingid = formData.get("checkoputid");

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
                weight: "BOLD",
                letterCase: "UPPER",
                kerning: "BASE",
              },
            },
            headingLevel2: {
              typography: {
                font: "PRIMARY",
                size: selected2,
                weight: "BASE",
                letterCase: "UPPER",
                kerning: "LOOSE",
              },
            },
            headingLevel3: {
              typography: {
                font: "PRIMARY",
                size: selected3,
                weight: "BASE",
                letterCase: "UPPER",
                kerning: "LOOSE",
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
};
export default function Index() {
  const nav = useNavigation();
  const { checkoutProfiles } = useLoaderData();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const [selectedone, setSelectedone] = useState("BASE");
  const [selectedtwo, setSelectedtwo] = useState("BASE");
  const [selectedthree, setSelectedthree] = useState("BASE");
  const [checkoputid, setCheckoputid] = useState(null);
  const handleSelectChangeone = useCallback(
    (value) => setSelectedone(value),
    []
  );
  const handleSelectChangetwo = useCallback(
    (value) => setSelectedtwo(value),
    []
  );
  const handleSelectChangethree = useCallback(
    (value) => setSelectedthree(value),
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
  const options1 = [
    { label: "BASE", value: "BASE" },
    { label: "EXTRA_EXTRA_LARGE", value: "EXTRA_EXTRA_LARGE" },
    { label: "EXTRA_LARGE", value: "EXTRA_LARGE" },
    { label: "EXTRA_SMALL", value: "EXTRA_SMALL" },
    { label: "LARGE", value: "LARGE" },
    { label: "MEDIUM", value: "MEDIUM" },
    { label: "SMALL", value: "SMALL" },
  ];
  const options2 = [
    { label: "BASE", value: "BASE" },
    { label: "EXTRA_EXTRA_LARGE", value: "EXTRA_EXTRA_LARGE" },
    { label: "EXTRA_LARGE", value: "EXTRA_LARGE" },
    { label: "EXTRA_SMALL", value: "EXTRA_SMALL" },
    { label: "LARGE", value: "LARGE" },
    { label: "MEDIUM", value: "MEDIUM" },
    { label: "SMALL", value: "SMALL" },
  ];
  const options3 = [
    { label: "BASE", value: "BASE" },
    { label: "EXTRA_EXTRA_LARGE", value: "EXTRA_EXTRA_LARGE" },
    { label: "EXTRA_LARGE", value: "EXTRA_LARGE" },
    { label: "EXTRA_SMALL", value: "EXTRA_SMALL" },
    { label: "LARGE", value: "LARGE" },
    { label: "MEDIUM", value: "MEDIUM" },
    { label: "SMALL", value: "SMALL" },
  ];

  const generateProduct = () =>
    submit(
      { selectedone, selectedtwo, selectedthree, checkoputid },
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
              <BlockStack gap="500">
                <Select
                  label="Heading level 1"
                  options={options1}
                  onChange={handleSelectChangeone}
                  value={selectedone}
                />
                <Select
                  label="Heading level 2"
                  options={options2}
                  onChange={handleSelectChangetwo}
                  value={selectedtwo}
                />
                <Select
                  label="Heading level 3"
                  options={options3}
                  onChange={handleSelectChangethree}
                  value={selectedthree}
                />
                <InlineStack gap="300">
                  <Button loading={isLoading} onClick={generateProduct}>
                    Change
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
