"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { LoaderIcon } from "lucide-react";
import {
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "../../atoms/widget-atom";
import { WidgetHeader } from "../components/widget-header";
import { useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

type InitStep = "storage" | "org" | "session" | "settings" | "vapi" | "done";

export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);
  const setScreen = useSetAtom(screenAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const validateOrganization = useAction(api.public.organizations.validate);
  useEffect(() => {
    if (step !== "org") {
      return;
    }

    setLoadingMessage("Loading organization");

    if (!organizationId) {
      setErrorMessage("Organization ID is required");
      setScreen("error");
      return;
    }

    setLoadingMessage("Verifying organization...");

    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);
        } else {
          setErrorMessage(result.reason || "Invalid Configuration");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Failed to verify organization");
        setScreen("error");
      });
  }, [step, organizationId, setErrorMessage, setScreen]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl"></p>
          <p className="text-lg"></p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <LoaderIcon className="animate-spin" />
        <p>{loadingMessage || "Loading..."}</p>
      </div>
    </>
  );
};
