"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import {
  Card,
  Box,
  Typography,
  Avatar,
  Chip,
  Divider,
  Stack,
  Checkbox,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function Card1() {
  const cardRef = useRef(null);
  const headerRef = useRef(null);
  const chipRef = useRef(null);
  const amountRef = useRef(null);
  const progressTrackRef = useRef(null);
  const progressFillRef = useRef(null);
  const progressTextRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // initial states
      gsap.set(cardRef.current, { opacity: 0, y: 18, scale: 0.98 });
      gsap.set([headerRef.current, amountRef.current], { opacity: 0, y: 10 });
      gsap.set(chipRef.current, { opacity: 0, scale: 0.85 });
      gsap.set(avatarRef.current, { opacity: 0, scale: 0.85, rotate: -6 });

      gsap.set(progressTrackRef.current, { opacity: 0, y: 8 });
      gsap.set(progressFillRef.current, { width: "0%" });
      gsap.set(progressTextRef.current, { opacity: 0, y: 6 });

      gsap.set([row1Ref.current, row2Ref.current], { opacity: 0, x: -10 });

      // timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(cardRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6 })
        .to(
          [headerRef.current, avatarRef.current],
          { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.45, stagger: 0.08 },
          "-=0.35"
        )
        .to(chipRef.current, { opacity: 1, scale: 1, duration: 0.35 }, "-=0.25")
        .to(amountRef.current, { opacity: 1, y: 0, duration: 0.35 }, "-=0.2")
        .to(progressTrackRef.current, { opacity: 1, y: 0, duration: 0.35 }, "-=0.15")
        .to(progressFillRef.current, { width: "80%", duration: 0.9, ease: "power2.out" }, "-=0.05")
        .to(progressTextRef.current, { opacity: 1, y: 0, duration: 0.25 }, "-=0.35")
        .to([row1Ref.current, row2Ref.current], { opacity: 1, x: 0, duration: 0.35, stagger: 0.1 }, "-=0.15");

      // subtle pulse on chip
      gsap.to(chipRef.current, {
        scale: 1.03,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card
      ref={cardRef}
      elevation={0}
      sx={{
        width: 560,
        maxWidth: "100%",
        borderRadius: 4,
        border: "2px solid rgba(255,255,255,0.15)",
        overflow: "hidden",
        color: "white",
        background:
          "radial-gradient(1200px 400px at 10% 0%, rgba(255,255,255,0.10), transparent 60%), linear-gradient(135deg, #3C5166 0%, #2B3E52 100%)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box
          ref={headerRef}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2.5,
                display: "grid",
                placeItems: "center",
                backgroundColor: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <SettingsOutlinedIcon sx={{ color: "rgba(255,255,255,0.9)" }} />
            </Box>

            <Box>
              <Typography sx={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>
                Loan Origination System
              </Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 700, opacity: 0.95 }}>
                (LOS)
              </Typography>
            </Box>
          </Stack>

          <Avatar
            ref={avatarRef}
            alt="User"
            src="/avatar.jpg" // replace with your asset
            sx={{
              width: 56,
              height: 56,
              border: "2px solid rgba(255,255,255,0.25)",
              boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
            }}
          />
        </Box>

        <Divider sx={{ my: 2.25, borderColor: "rgba(255,255,255,0.18)" }} />

        {/* Loan info */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Typography sx={{ fontSize: 28, fontWeight: 800 }}>SME Loan</Typography>

          <Chip
            ref={chipRef}
            label="In Review"
            sx={{
              px: 1,
              height: 40,
              fontSize: 16,
              fontWeight: 700,
              color: "white",
              backgroundColor: "#1E88E5",
              borderRadius: 2,
              boxShadow: "0 12px 22px rgba(30,136,229,0.35)",
            }}
          />
        </Box>

        <Typography
          ref={amountRef}
          sx={{ mt: 2, fontSize: 24, fontWeight: 700, letterSpacing: 0.2, opacity: 0.95 }}
        >
          LKR 5,000,000
        </Typography>

        {/* Progress */}
        <Box sx={{ mt: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.25 }}>
            <Typography sx={{ fontSize: 20, fontWeight: 700, opacity: 0.95 }}>Progress</Typography>
            <Typography ref={progressTextRef} sx={{ fontSize: 20, fontWeight: 800 }}>
              80%
            </Typography>
          </Stack>

          <Box
            ref={progressTrackRef}
            sx={{
              position: "relative",
              height: 34,
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.25)",
              backgroundColor: "rgba(0,0,0,0.10)",
              overflow: "hidden",
            }}
          >
            <Box
              ref={progressFillRef}
              sx={{
                position: "absolute",
                inset: 0,
                width: "0%",
                borderRadius: 999,
                background: "linear-gradient(90deg, #4ADE80 0%, #22C55E 100%)",
                boxShadow: "0 10px 18px rgba(34,197,94,0.25)",
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2.5, borderColor: "rgba(255,255,255,0.18)" }} />

        {/* Checklist */}
        <Stack spacing={1.7}>
          <Box
            ref={row1Ref}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1.3} alignItems="center">
              <Checkbox
                defaultChecked
                icon={<CheckCircleRoundedIcon sx={{ opacity: 0.35 }} />}
                checkedIcon={<CheckCircleRoundedIcon />}
                sx={{
                  p: 0,
                  "& svg": { fontSize: 26, color: "#22C55E" },
                }}
              />
              <Typography sx={{ fontSize: 22, fontWeight: 700 }}>Doc Upload</Typography>
            </Stack>

            <Checkbox
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                border: "2px solid rgba(255,255,255,0.35)",
                "&.Mui-checked": { color: "#22C55E" },
              }}
            />
          </Box>

          <Box
            ref={row2Ref}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1.3} alignItems="center">
              <Checkbox
                defaultChecked
                icon={<CheckCircleRoundedIcon sx={{ opacity: 0.35 }} />}
                checkedIcon={<CheckCircleRoundedIcon />}
                sx={{
                  p: 0,
                  "& svg": { fontSize: 26, color: "#22C55E" },
                }}
              />
              <Typography sx={{ fontSize: 22, fontWeight: 700 }}>Credit Score Pulled</Typography>
            </Stack>

            <Checkbox
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                border: "2px solid rgba(255,255,255,0.35)",
                "&.Mui-checked": { color: "#22C55E" },
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}
