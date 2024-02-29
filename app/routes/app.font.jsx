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
  DropZone,
  LegacyStack,
  Thumbnail,
  Text,
  Spinner,
  ExceptionList,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useState, useCallback } from "react";
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

  // const shop = formData.get("shop");
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
    //         shop,
    //       },
    //     },
    //   });
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
    const responsefile = await admin.graphql(
      `#graphql 
      query queryFiles {
      files(first: 1 reverse:true) {
      edges {
        node {
          ... on GenericFile {
            id
            url
            fileStatus
          }
        }
      }
      }}`
    );
    const responsefilejson = await responsefile.json();
    const lastfileid = responsefilejson?.data?.files?.edges[0]?.node?.id;
    const response = await admin.graphql(
      `#graphql
      mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
        checkoutBrandingUpsert(
          checkoutBrandingInput: $checkoutBrandingInput
          checkoutProfileId: $checkoutProfileId
        ) {
          checkoutBranding {
            designSystem{
                typography{
                    primary{
                        base{
                            sources
                            weight
                        }
                        bold{
                            sources
                            weight
                        }
                    }
                    secondary{
                        base{
                            sources
                            weight
                        }
                        bold{
                            sources
                            weight
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
              typography: {
                primary: {
                  customFontGroup: {
                    base: {
                      genericFileId: lastfileid,
                      weight: 400,
                    },
                    bold: {
                      genericFileId: lastfileid,
                      weight: 700,
                    },
                  },
                },
                secondary: {
                  customFontGroup: {
                    base: {
                      genericFileId: lastfileid,
                      weight: 400,
                    },
                    bold: {
                      genericFileId: lastfileid,
                      weight: 700,
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
  // useEffect(() => {
  //   if (allUsers && allUsers.length > 0) {
  //     const userWithCheckoputid = allUsers.find(
  //       (user) => user.brandingid === checkoputid
  //     );

  //     if (userWithCheckoputid) {
  //       setHeadingLevelOne(userWithCheckoputid.customizations.selected1);
  //       setHeadingLevelOneWidth(
  //         userWithCheckoputid.customizations.selected1Width
  //       );
  //       setHeadingLevelOneLetterCase(
  //         userWithCheckoputid.customizations.selected3LetterCase
  //       );
  //       setHeadingLevelOneKerning(
  //         userWithCheckoputid.customizations.selected3Kerning
  //       );

  //       setHeadingLevelTwo(userWithCheckoputid.customizations.selected2);
  //       setHeadingLevelTwoWidth(
  //         userWithCheckoputid.customizations.selected2Width
  //       );
  //       setHeadingLevelTwoLetterCase(
  //         userWithCheckoputid.customizations.selected3LetterCase
  //       );
  //       setHeadingLevelTwoKerning(
  //         userWithCheckoputid.customizations.selected3Kerning
  //       );

  //       setHeadingLevelThree(userWithCheckoputid.customizations.selected3);
  //       setHeadingLevelThreeWidth(
  //         userWithCheckoputid.customizations.selected3Width
  //       );
  //       setHeadingLevelThreeLetterCase(
  //         userWithCheckoputid.customizations.selected3LetterCase
  //       );
  //       setHeadingLevelThreeKerning(
  //         userWithCheckoputid.customizations.selected3Kerning
  //       );
  //     } else {
  //       // If the checkoputid doesn't match any user, set defaults
  //       setHeadingLevelOne("BASE");
  //       setHeadingLevelOneWidth("BASE");
  //       setHeadingLevelOneLetterCase("NONE");
  //       setHeadingLevelOneKerning("BASE");

  //       setHeadingLevelTwo("BASE");
  //       setHeadingLevelTwoWidth("BASE");
  //       setHeadingLevelTwoLetterCase("NONE");
  //       setHeadingLevelTwoKerning("BASE");

  //       setHeadingLevelThree("BASE");
  //       setHeadingLevelThreeWidth("BASE");
  //       setHeadingLevelThreeLetterCase("NONE");
  //       setHeadingLevelThreeKerning("BASE");
  //     }
  //   }
  // }, [allUsers, checkoputid]);

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

  const [files, setFiles] = useState([]);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  const handleDropZoneDrop = useCallback(
    async (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setIsUploadingFile(true);

      const formData = new FormData();

      if (acceptedFiles.length) {
        setFiles(acceptedFiles);
      }

      acceptedFiles.forEach((file) => {
        formData.append("files", file);
      });

      try {
        await fetch("/file", {
          method: "POST",
          headers: {
            contentType: "multipart/form-data",
          },
          body: formData,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsUploadingFile(false);
      }
    },
    []
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: "0" }}>
      <LegacyStack vertical>
        {files.map((file, index) => (
          <LegacyStack alignment="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : ""
              }
            />
            <div>
              {file.name}{" "}
              <Text variant="bodySm" as="p">
                {file.size} bytes
              </Text>
            </div>
          </LegacyStack>
        ))}
      </LegacyStack>
    </div>
  );
  const fileUploadLoading = isUploadingFile && (
    <Spinner accessibilityLabel="Small spinner example" size="small" />
  );

  const generateProduct = () =>
    submit(
      {
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
            <ExceptionList
              items={[
                {
                  description: "Only Supports WOFF formate font",
                },
              ]}
            />
            <DropZone onDrop={handleDropZoneDrop}>
              {uploadedFiles}
              {fileUpload}
            </DropZone>
            <BlockStack gap="500">
              <InlineStack gap="300">
                {isUploadingFile ? (
                  fileUploadLoading
                ) : (
                  <Button loading={isLoading} onClick={generateProduct}>
                    Change
                  </Button>
                )}
              </InlineStack>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
