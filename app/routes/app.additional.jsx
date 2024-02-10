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
  ExceptionList,
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
  const choiceListgroupspacing = formData.get("choiceListgroupspacing");
  const controlCorner = formData.get("controlCorner");
  const controlBorder = formData.get("controlBorder");
  const controLabelPosition = formData.get("controLabelPosition");
  const merchandiseThumbnailBorder = formData.get("merchandiseThumbnailBorder");
  const primaryButtonbackground = formData.get("primaryButtonbackground");
  const primaryButtonborder = formData.get("primaryButtonborder");
  const primaryCornerRadius = formData.get("primaryCornerRadius");
  const primaryBlockPadding = formData.get("primaryBlockPadding");
  const primaryInlinePadding = formData.get("primaryInlinePadding");
  const primarySize = formData.get("primarySize");
  const primaryfont = formData.get("primaryfont");
  const primaryWeight = formData.get("primaryWeight");
  const primaryLetterCase = formData.get("primaryLetterCase");
  const primaryKerning = formData.get("primaryKerning");
  const secondryButtonbackground = formData.get("secondryButtonbackground");
  const secondryButtonborder = formData.get("secondryButtonborder");
  const secondryCornerRadius = formData.get("secondryCornerRadius");
  const secondryBlockPadding = formData.get("secondryBlockPadding");
  const secondryInlinePadding = formData.get("secondryInlinePadding");
  const secondryfont = formData.get("secondryfont");
  const secondrySize = formData.get("secondrySize");
  const secondryWeight = formData.get("secondryWeight");
  const secondryLetterCase = formData.get("secondryLetterCase");
  const secondryKerning = formData.get("secondryKerning");
  const selectborder = formData.get("selectborder");
  const selectfont = formData.get("selectfont");
  const selectsize = formData.get("selectsize");
  const selectweight = formData.get("selectweight");
  const selectkerning = formData.get("selectkerning");
  const selectletterCase = formData.get("selectletterCase");
  const textFieldborder = formData.get("textFieldborder");
  const textFieldfont = formData.get("textFieldfont");
  const textFieldsize = formData.get("textFieldsize");
  const textFieldweight = formData.get("textFieldweight");
  const textFieldletterCase = formData.get("textFieldletterCase");
  const textFieldkerning = formData.get("textFieldkerning");
  const merchandiseThumbnailCornerRadius = formData.get(
    "merchandiseThumbnailCornerRadius"
  );
  const shop = formData.get("shop");
  const brandingid = formData.get("checkoputid");
  console.log({
    cornerRadius,
    choiceListgroupspacing,
    controlCorner,
    controlBorder,
    controLabelPosition,
    merchandiseThumbnailBorder,
    primaryButtonbackground,
    primaryButtonborder,
    primaryCornerRadius,
    primaryBlockPadding,
    primaryInlinePadding,
    primarySize,
    primaryfont,
    primaryWeight,
    primaryLetterCase,
    primaryKerning,
    secondryButtonbackground,
    secondryButtonborder,
    secondryCornerRadius,
    secondryBlockPadding,
    secondryInlinePadding,
    secondryfont,
    secondrySize,
    secondryWeight,
    secondryLetterCase,
    secondryKerning,
    selectborder,
    selectfont,
    selectsize,
    selectweight,
    selectkerning,
    selectletterCase,
    textFieldborder,
    textFieldfont,
    textFieldsize,
    textFieldweight,
    textFieldletterCase,
    textFieldkerning,
    merchandiseThumbnailCornerRadius,
  });
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
                  spacing: choiceListgroupspacing,
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
                background: primaryButtonbackground,
                border: primaryButtonborder,
                cornerRadius: primaryCornerRadius,
                blockPadding: primaryBlockPadding,
                inlinePadding: primaryInlinePadding,
                typography: {
                  font: primaryfont,
                  size: primarySize,
                  weight: primaryWeight,
                  letterCase: primaryLetterCase,
                  kerning: primaryKerning,
                },
              },
              secondaryButton: {
                background: secondryButtonbackground,
                border: secondryButtonborder,
                cornerRadius: secondryCornerRadius,
                blockPadding: secondryBlockPadding,
                inlinePadding: secondryInlinePadding,
                typography: {
                  font: secondryfont,
                  size: secondrySize,
                  weight: secondryWeight,
                  letterCase: secondryLetterCase,
                  kerning: secondryKerning,
                },
              },
              select: {
                border: selectborder,
                typography: {
                  font: selectfont,
                  size: selectsize,
                  weight: selectweight,
                  letterCase: selectletterCase,
                  kerning: selectkerning,
                },
              },
              textField: {
                border: textFieldborder,
                typography: {
                  font: textFieldfont,
                  size: textFieldsize,
                  weight: textFieldweight,
                  letterCase: textFieldletterCase,
                  kerning: textFieldkerning,
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
  const [choiceListgroupspacing, setChoiceListgroupspacing] = useState("");
  const [controLabelPosition, setControlLabelPosition] = useState("");
  const [
    merchandiseThumbnailCornerRadius,
    setMerchandiseThumbnailCornerRadius,
  ] = useState("");
  const [primaryButtonbackground, setPrimaryButtonbackground] = useState("");
  const [merchandiseThumbnailBorder, setMerchandiseThumbnailBorder] =
    useState("");
  const [primaryButtonborder, setPrimaryButtonborder] = useState("");
  const [primaryCornerRadius, setPrimaryCornerRadius] = useState("");
  const [primaryBlockPadding, setPrimaryBlockPadding] = useState("");
  const [primaryInlinePadding, setPrimaryInlinePadding] = useState("");
  const [primaryfont, setPrimaryfont] = useState("");
  const [primarySize, setPrimarySize] = useState("");
  const [primaryWeight, setPrimaryWeight] = useState("");
  const [primaryLetterCase, setPrimaryLetterCase] = useState("");
  const [primaryKerning, setPrimaryKerning] = useState("");
  const [secondryButtonbackground, setSecondryButtonbackground] = useState("");
  const [secondryButtonborder, setSecondryButtonborder] = useState("");
  const [secondryCornerRadius, setSecondryCornerRadius] = useState("");
  const [secondryBlockPadding, setSecondryBlockPadding] = useState("");
  const [secondryInlinePadding, setSecondryInlinePadding] = useState("");
  const [secondryfont, setSecondryfont] = useState("");
  const [secondrySize, setSecondrySize] = useState("");
  const [secondryWeight, setSecondryWeight] = useState("");
  const [secondryLetterCase, setSecondryLetterCase] = useState("");
  const [secondryKerning, setSecondryKerning] = useState("");
  const [selectborder, setSelectborder] = useState("");
  const [selectfont, setSelectfont] = useState("");
  const [selectsize, setSelectsize] = useState("");
  const [selectweight, setSelectweight] = useState("");
  const [selectkerning, setSelectkerning] = useState("");
  const [selectletterCase, setSelectletterCase] = useState("");
  const [textFieldborder, setTextFieldborder] = useState("");
  const [textFieldfont, setTextFieldfont] = useState("");
  const [textFieldsize, setTextFieldsize] = useState("");
  const [textFieldweight, setTextFieldweight] = useState("");
  const [textFieldletterCase, setTextFieldletterCase] = useState("");
  const [textFieldkerning, setTextFieldkerning] = useState("");
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
  const handlSelectletterCase = useCallback(
    (value) => setSelectletterCase(value),
    []
  );
  const handlechoiceListgroupspacing = useCallback(
    (value) => setChoiceListgroupspacing(value),
    []
  );
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
  const handlPrimaryButtonbackground = useCallback(
    (value) => setPrimaryButtonbackground(value),
    []
  );
  const handlPrimaryButtonborder = useCallback(
    (value) => setPrimaryButtonborder(value),
    []
  );
  const handlPrimaryButtonCornerRadius = useCallback(
    (value) => setPrimaryCornerRadius(value),
    []
  );
  const handlPrimaryButtonblockPadding = useCallback(
    (value) => setPrimaryBlockPadding(value),
    []
  );
  const handlPrimaryInlinePadding = useCallback(
    (value) => setPrimaryInlinePadding(value),
    []
  );
  const handlPrimaryLetterCase = useCallback(
    (value) => setPrimaryLetterCase(value),
    []
  );
  const handlweight = useCallback((value) => setPrimaryWeight(value), []);
  const handlPrimarySize = useCallback((value) => setPrimarySize(value), []);
  const handlfont = useCallback((value) => setPrimaryfont(value), []);
  const handlPrimarykerning = useCallback(
    (value) => setPrimaryKerning(value),
    []
  );
  const handlSecondaryButtonbackground = useCallback(
    (value) => setSecondryButtonbackground(value),
    []
  );
  const handlSecondaryButtonborder = useCallback(
    (value) => setSecondryButtonborder(value),
    []
  );
  const handlSecondaryButtonCornerRadius = useCallback(
    (value) => setSecondryCornerRadius(value),
    []
  );
  const handlSecondaryButtonblockPadding = useCallback(
    (value) => setSecondryBlockPadding(value),
    []
  );
  const handlSecondaryInlinePadding = useCallback(
    (value) => setSecondryInlinePadding(value),
    []
  );
  const handlSecondaryfont = useCallback((value) => setSecondryfont(value), []);
  const handlSecondarySize = useCallback((value) => setSecondrySize(value), []);
  const handlSecondaryweight = useCallback(
    (value) => setSecondryWeight(value),
    []
  );
  const handlSecondaryLetterCase = useCallback(
    (value) => setSecondryLetterCase(value),
    []
  );
  const handlSecondarykerning = useCallback(
    (value) => setSecondryKerning(value),
    []
  );
  const handlSelectborder = useCallback((value) => setSelectborder(value), []);
  const handlSelectfont = useCallback((value) => setSelectfont(value), []);
  const handlSelectsize = useCallback((value) => setSelectsize(value), []);
  const handlSelectweight = useCallback((value) => setSelectweight(value), []);
  const handlSelectkerning = useCallback(
    (value) => setSelectkerning(value),
    []
  );
  const handlTextFieldborder = useCallback(
    (value) => setTextFieldborder(value),
    []
  );
  const handlTextFieldfont = useCallback(
    (value) => setTextFieldfont(value),
    []
  );
  const handlTextFieldsize = useCallback(
    (value) => setTextFieldsize(value),
    []
  );
  const handlTextFieldweight = useCallback(
    (value) => setTextFieldweight(value),
    []
  );
  const handlTextFieldletterCase = useCallback(
    (value) => setTextFieldletterCase(value),
    []
  );
  const handlTextFieldkerning = useCallback(
    (value) => setTextFieldkerning(value),
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
  const backgroundoption = [
    { label: "NOT SELECTED", value: "" },
    { label: "SOLID", value: "SOLID" },
    { label: "NONE", value: "NONE" },
  ];
  const font = [
    { label: "PRIMARY", value: "PRIMARY" },
    { label: "SECONDARY", value: "SECONDARY" },
  ];
  const borderOption = [
    { label: "NOT SELECTED", value: "" },
    { label: "FULL", value: "FULL" },
    { label: "NONE", value: "NONE" },
  ];
  const weight = [
    { label: "BASE", value: "BASE" },
    { label: "BOLD", value: "BOLD" },
  ];
  const blockPadding = [
    { label: "NONE", value: "NONE" },
    { label: "EXTRA_TIGHT", value: "EXTRA_TIGHT" },
    { label: "TIGHT", value: "TIGHT" },
    { label: "BASE", value: "BASE" },
    { label: "LOOSE", value: "LOOSE" },
    { label: "EXTRA_LOOSE", value: "EXTRA_LOOSE" },
  ];
  const size = [
    { label: "EXTRA_SMALL", value: "EXTRA_SMALL" },
    { label: "SMALL", value: "SMALL" },
    { label: "BASE", value: "BASE" },
    { label: "MEDIUM", value: "MEDIUM" },
    { label: "LARGE", value: "LARGE" },
    { label: "EXTRA_LARGE", value: "EXTRA_LARGE" },
    { label: "EXTRA_EXTRA_LARGE", value: "EXTRA_EXTRA_LARGE" },
  ];
  const letterCase = [
    { label: "LOWER", value: "LOWER" },
    { label: "NONE", value: "NONE" },
    { label: "TITLE", value: "TITLE" },
    { label: "UPPER", value: "UPPER" },
  ];
  const kerning = [
    { label: "BASE", value: "BASE" },
    { label: "LOOSE", value: "LOOSE" },
    { label: "EXTRA_LOOSE", value: "EXTRA_LOOSE" },
  ];
  const choiceListgroupspacingotion = [
    { label: "NONE", value: "NONE" },
    { label: "BASE", value: "BASE" },
    { label: "SMALL", value: "SMALL" },
    { label: "SMALL_100", value: "SMALL_100" },
    { label: "SMALL_100", value: "SMALL_200" },
    { label: "SMALL_100", value: "SMALL_300" },
    { label: "SMALL_100", value: "SMALL_400" },
    { label: "SMALL_100", value: "SMALL_500" },
    { label: "LARGE", value: "LARGE" },
    { label: "LARGE_100", value: "LARGE_100" },
    { label: "LARGE_100", value: "LARGE_200" },
    { label: "LARGE_100", value: "LARGE_300" },
    { label: "LARGE_100", value: "LARGE_400" },
    { label: "LARGE_100", value: "LARGE_500" },
  ];
  const selectborderoption = [
    { label: "NONE", value: "NONE" },
    { label: "BLOCK_END", value: "BLOCK_END" },
    { label: "FULL", value: "FULL" },
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
        primaryButtonbackground,
        primaryButtonborder,
        primaryCornerRadius,
        primaryBlockPadding,
        primaryInlinePadding,
        primaryfont,
        primarySize,
        primaryWeight,
        primaryLetterCase,
        primaryKerning,
        secondryButtonbackground,
        secondryButtonborder,
        secondryCornerRadius,
        secondryBlockPadding,
        secondryInlinePadding,
        secondryfont,
        secondrySize,
        secondryWeight,
        secondryLetterCase,
        secondryKerning,
        choiceListgroupspacing,
        selectborder,
        selectfont,
        selectsize,
        selectweight,
        selectkerning,
        selectletterCase,
        textFieldborder,
        textFieldfont,
        textFieldsize,
        textFieldweight,
        textFieldletterCase,
        textFieldkerning,
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
                  label="Choice List group spacing"
                  options={choiceListgroupspacingotion}
                  onChange={handlechoiceListgroupspacing}
                  value={choiceListgroupspacing}
                />
              </Card>
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
              <Card>
                <ExceptionList
                  items={[
                    {
                      description: "PrimaryButton",
                    },
                  ]}
                />
                <Select
                  label="PrimaryButton background"
                  options={backgroundoption}
                  onChange={handlPrimaryButtonbackground}
                  value={primaryButtonbackground}
                />
                <Select
                  label="PrimaryButton border"
                  options={borderOption}
                  onChange={handlPrimaryButtonborder}
                  value={primaryButtonborder}
                />
                <Select
                  label="PrimaryButton CornerRadius"
                  options={optionMerchandiseThumbnailCornerRadius}
                  onChange={handlPrimaryButtonCornerRadius}
                  value={primaryCornerRadius}
                />
                <Select
                  label="PrimaryButton blockPadding"
                  options={blockPadding}
                  onChange={handlPrimaryButtonblockPadding}
                  value={primaryBlockPadding}
                />
                <Select
                  label="PrimaryButton inlinePadding"
                  options={blockPadding}
                  onChange={handlPrimaryInlinePadding}
                  value={primaryInlinePadding}
                />
                <Card>
                  <Select
                    label="PrimaryButton font"
                    options={font}
                    onChange={handlfont}
                    value={primaryfont}
                  />
                  <Select
                    label="PrimaryButton size"
                    options={size}
                    onChange={handlPrimarySize}
                    value={primarySize}
                  />
                  <Select
                    label="PrimaryButton weight"
                    options={weight}
                    onChange={handlweight}
                    value={primaryWeight}
                  />
                  <Select
                    label="PrimaryButton letterCase"
                    options={letterCase}
                    onChange={handlPrimaryLetterCase}
                    value={primaryLetterCase}
                  />
                  <Select
                    label="PrimaryButton kerning"
                    options={kerning}
                    onChange={handlPrimarykerning}
                    value={primaryKerning}
                  />
                </Card>
              </Card>
              <Card>
                <ExceptionList
                  items={[
                    {
                      description: "secondaryButton",
                    },
                  ]}
                />
                <Select
                  label="secondaryButton background"
                  options={backgroundoption}
                  onChange={handlSecondaryButtonbackground}
                  value={secondryButtonbackground}
                />
                <Select
                  label="secondaryButton border"
                  options={borderOption}
                  onChange={handlSecondaryButtonborder}
                  value={secondryButtonborder}
                />
                <Select
                  label="secondaryButton CornerRadius"
                  options={optionMerchandiseThumbnailCornerRadius}
                  onChange={handlSecondaryButtonCornerRadius}
                  value={secondryCornerRadius}
                />
                <Select
                  label="secondaryButton blockPadding"
                  options={blockPadding}
                  onChange={handlSecondaryButtonblockPadding}
                  value={secondryBlockPadding}
                />
                <Select
                  label="secondaryButton inlinePadding"
                  options={blockPadding}
                  onChange={handlSecondaryInlinePadding}
                  value={secondryInlinePadding}
                />
                <Card>
                  <Select
                    label="secondaryButton font"
                    options={font}
                    onChange={handlSecondaryfont}
                    value={secondryfont}
                  />
                  <Select
                    label="secondaryButton size"
                    options={size}
                    onChange={handlSecondarySize}
                    value={secondrySize}
                  />
                  <Select
                    label="secondaryButton weight"
                    options={weight}
                    onChange={handlSecondaryweight}
                    value={secondryWeight}
                  />
                  <Select
                    label="secondaryButton letterCase"
                    options={letterCase}
                    onChange={handlSecondaryLetterCase}
                    value={secondryLetterCase}
                  />
                  <Select
                    label="secondaryButton kerning"
                    options={kerning}
                    onChange={handlSecondarykerning}
                    value={secondryKerning}
                  />
                </Card>
              </Card>
              <Card>
                <ExceptionList
                  items={[
                    {
                      description: "select",
                    },
                  ]}
                />
                <Select
                  label="Select border"
                  options={selectborderoption}
                  onChange={handlSelectborder}
                  value={selectborder}
                />
                <Card>
                  <ExceptionList
                    items={[
                      {
                        description: "Select typography",
                      },
                    ]}
                  />
                  <Select
                    label="Select font"
                    options={font}
                    onChange={handlSelectfont}
                    value={selectfont}
                  />
                  <Select
                    label="Select size"
                    options={size}
                    onChange={handlSelectsize}
                    value={selectsize}
                  />
                  <Select
                    label="Select weight"
                    options={weight}
                    onChange={handlSelectweight}
                    value={selectweight}
                  />
                  <Select
                    label="Select letterCase"
                    options={letterCase}
                    onChange={handlSelectletterCase}
                    value={selectletterCase}
                  />
                  <Select
                    label="Select kerning"
                    options={kerning}
                    onChange={handlSelectkerning}
                    value={selectkerning}
                  />
                </Card>
              </Card>
              <Card>
                <ExceptionList
                  items={[
                    {
                      description: "TextField",
                    },
                  ]}
                />
                <Select
                  label="TextField border"
                  options={selectborderoption}
                  onChange={handlTextFieldborder}
                  value={textFieldborder}
                />
                <Card>
                  <ExceptionList
                    items={[
                      {
                        description: "TextField typography",
                      },
                    ]}
                  />
                  <Select
                    label="TextField font"
                    options={font}
                    onChange={handlTextFieldfont}
                    value={textFieldfont}
                  />
                  <Select
                    label="TextField size"
                    options={size}
                    onChange={handlTextFieldsize}
                    value={textFieldsize}
                  />
                  <Select
                    label="TextField weight"
                    options={weight}
                    onChange={handlTextFieldweight}
                    value={textFieldweight}
                  />
                  <Select
                    label="TextField letterCase"
                    options={letterCase}
                    onChange={handlTextFieldletterCase}
                    value={textFieldletterCase}
                  />
                  <Select
                    label="TextField kerning"
                    options={kerning}
                    onChange={handlTextFieldkerning}
                    value={textFieldkerning}
                  />
                </Card>
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
