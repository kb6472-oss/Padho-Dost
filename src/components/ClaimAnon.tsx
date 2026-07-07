"use client";

import { useEffect } from "react";
import { claimAnonData } from "@/lib/user-actions";

// When a logged-in user lands, merge any guest (anonymous) attempts from this
// device into their account — once.
export default function ClaimAnon() {
  useEffect(() => {
    const anonId = localStorage.getItem("pd_anon");
    if (!anonId) return;
    const claimedKey = `pd_claimed_${anonId}`;
    if (localStorage.getItem(claimedKey)) return;
    claimAnonData(anonId)
      .then((r) => {
        if (r?.ok) localStorage.setItem(claimedKey, "1");
      })
      .catch(() => {});
  }, []);

  return null;
}
