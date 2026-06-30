SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict IbCZadyDp4eJEtFG5f39oarpPvLRQEd9uMLMBRZbGTYosEsvfzFql7PDgeuJLyw

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'fe8ea687-56f3-4196-a842-d6277d16b66e', 'authenticated', 'authenticated', 'admin@local.app', '$2a$10$wE2iF0XoZ4Y3jt8fLkGa0OpTpRpc2ZdiQlK1NF5hm41s9uqXhqbpG', '2026-05-22 07:39:49.909336+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-25 07:45:07.367754+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-05-22 07:39:49.890606+00', '2026-06-25 07:45:07.403934+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '7af3a293-bf1f-40c7-925e-683ff23d9fe3', 'authenticated', 'authenticated', 'adminb@local.app', '$2a$10$UXXGtX0ll.K5N1/.0toPDOFdep4V8Pl/XpPqw4kcW2oSLHUqAJ4x6', '2026-05-30 09:33:16.174493+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-25 07:45:35.840761+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-05-30 09:33:16.145138+00', '2026-06-25 08:48:21.279529+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '6b68c38a-b9b7-4c92-8600-1c28beb68691', 'authenticated', 'authenticated', 'staffb@local.app', '$2a$10$27ezJqc/gmm5rE5l/sgWzu7bCvH7brgcbnkhxFx0AVgNBdmr.jcHG', '2026-06-01 10:56:10.378768+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-01 10:58:11.794605+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-06-01 10:56:10.352576+00', '2026-06-01 10:58:11.832763+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c5616835-075b-4d50-b424-1282df4c4855', 'authenticated', 'authenticated', 'staff@local.app', '$2a$10$fayMmyAFSAITfnWliog1/esmfyXBnOWW5u.VnmS0qlFTnZ1s/XPXK', '2026-05-22 12:37:11.612009+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-06-01 12:31:34.720875+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-05-22 12:37:11.585569+00', '2026-06-01 12:31:34.740483+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('fe8ea687-56f3-4196-a842-d6277d16b66e', 'fe8ea687-56f3-4196-a842-d6277d16b66e', '{"sub": "fe8ea687-56f3-4196-a842-d6277d16b66e", "email": "admin@local.app", "email_verified": false, "phone_verified": false}', 'email', '2026-05-22 07:39:49.906573+00', '2026-05-22 07:39:49.906631+00', '2026-05-22 07:39:49.906631+00', 'ccaa0e42-cc97-4f62-ace9-46f11266f2b4'),
	('c5616835-075b-4d50-b424-1282df4c4855', 'c5616835-075b-4d50-b424-1282df4c4855', '{"sub": "c5616835-075b-4d50-b424-1282df4c4855", "email": "staff@local.app", "email_verified": false, "phone_verified": false}', 'email', '2026-05-22 12:37:11.604879+00', '2026-05-22 12:37:11.604935+00', '2026-05-22 12:37:11.604935+00', '85c16674-b84a-4336-8ad1-1ddcc25a9f38'),
	('7af3a293-bf1f-40c7-925e-683ff23d9fe3', '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '{"sub": "7af3a293-bf1f-40c7-925e-683ff23d9fe3", "email": "adminb@local.app", "email_verified": false, "phone_verified": false}', 'email', '2026-05-30 09:33:16.169782+00', '2026-05-30 09:33:16.169842+00', '2026-05-30 09:33:16.169842+00', '9cd488dc-be7b-4639-a1fb-d69947da215d'),
	('6b68c38a-b9b7-4c92-8600-1c28beb68691', '6b68c38a-b9b7-4c92-8600-1c28beb68691', '{"sub": "6b68c38a-b9b7-4c92-8600-1c28beb68691", "email": "staffb@local.app", "email_verified": false, "phone_verified": false}', 'email', '2026-06-01 10:56:10.372812+00', '2026-06-01 10:56:10.373414+00', '2026-06-01 10:56:10.373414+00', '1ae5a32c-3352-49e5-8e05-f827add188e7');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('d44bb4a3-6e49-4d0f-973b-5674d40dbc8b', '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-25 07:45:35.841582+00', '2026-06-25 08:48:21.292031+00', NULL, 'aal1', NULL, '2026-06-25 08:48:21.291929', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '154.227.131.117', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('d44bb4a3-6e49-4d0f-973b-5674d40dbc8b', '2026-06-25 07:45:35.861815+00', '2026-06-25 07:45:35.861815+00', 'password', '1106f55f-5bc5-45f2-8419-e3fb79c7c5c6');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 212, 's5bg3576xmly', '7af3a293-bf1f-40c7-925e-683ff23d9fe3', true, '2026-06-25 07:45:35.858629+00', '2026-06-25 08:48:21.256314+00', NULL, 'd44bb4a3-6e49-4d0f-973b-5674d40dbc8b'),
	('00000000-0000-0000-0000-000000000000', 213, 'ftt7egoi2z6h', '7af3a293-bf1f-40c7-925e-683ff23d9fe3', false, '2026-06-25 08:48:21.26916+00', '2026-06-25 08:48:21.26916+00', 's5bg3576xmly', 'd44bb4a3-6e49-4d0f-973b-5674d40dbc8b');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: businesses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."businesses" ("id", "name", "phone", "email", "address", "created_at", "logo_url", "receipt_footer", "currency", "business_type") VALUES
	('a08e3d86-7161-4e77-b708-b29dcad0a236', 'Kaitu Dancers Closet Ltd', '0777932218', 'clarekom@yahoo.com', 'Kyaliwajjala', '2026-05-25 12:50:22.286968+00', 'https://rxakmlekgnastxqxuein.supabase.co/storage/v1/object/public/logos/kaitu.png', '', 'UGX', 'retail'),
	('3804a347-60f3-415a-aff1-052ec4a6f461', 'Beauty Bliss', '0774773680', 'bbliss@gmail.com', 'Fort Portal', '2026-05-30 09:19:26.544807+00', 'https://rxakmlekgnastxqxuein.supabase.co/storage/v1/object/public/logos/Bbliss.png', NULL, 'UGX', 'salon');


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."categories" ("id", "name", "created_at", "business_id") OVERRIDING SYSTEM VALUE VALUES
	(13, 'Cosmetics', '2026-06-05 07:25:52.129818+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(14, 'Hair', '2026-06-05 07:26:08.467365+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(15, 'Hair Products', '2026-06-05 07:26:22.443096+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(16, 'Bags', '2026-06-05 07:26:34.705438+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(17, 'Shoes', '2026-06-05 07:26:45.551581+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(18, 'Clothing', '2026-06-05 07:27:00.726906+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(19, 'Under Garments', '2026-06-05 07:27:12.313889+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(20, 'Make Up', '2026-06-05 07:27:23.827195+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(21, 'Accessories', '2026-06-05 07:27:35.864062+00', '3804a347-60f3-415a-aff1-052ec4a6f461');


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."expenses" ("id", "title", "category", "amount", "notes", "expense_date", "created_at", "business_id") VALUES
	(5, 'Water ', 'Other', 2000, '', '2026-06-02', '2026-06-10 09:28:20.331096+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(6, 'Yaka', 'Electricity', 25000, '', '2026-06-01', '2026-06-10 09:29:17.546515+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(7, 'Monthly Rent', 'Rent', 260000, '', '2026-06-01', '2026-06-10 09:29:51.172448+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(8, 'Weekly Pay', 'Salaries', 140000, '', '2026-06-07', '2026-06-10 10:03:18.385034+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(9, 'Water', 'Other', 1000, '', '2026-06-14', '2026-06-15 10:17:44.122479+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(10, 'Omo', 'Other', 500, '', '2026-06-14', '2026-06-15 10:18:00.595169+00', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(11, 'Weekly Pay', 'Salaries', 140000, '', '2026-06-14', '2026-06-15 12:49:08.518804+00', '3804a347-60f3-415a-aff1-052ec4a6f461');


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."permissions" ("id", "role", "page", "can_view", "can_create", "can_edit", "can_delete") VALUES
	(1, 'staff', 'products', true, true, false, false),
	(2, 'admin', 'products', true, true, true, true),
	(3, 'admin', 'services', true, true, true, true),
	(4, 'staff', 'services', true, true, false, false);


--
-- Data for Name: units; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."units" ("id", "name", "short_name", "business_id", "created_at") VALUES
	(1, 'Each', 'ea', NULL, '2026-06-05 14:26:01.512816+00'),
	(2, 'Piece', 'pc', NULL, '2026-06-05 14:26:01.512816+00'),
	(3, 'Box', 'box', NULL, '2026-06-05 14:26:01.512816+00'),
	(4, 'Carton', 'ctn', NULL, '2026-06-05 14:26:01.512816+00'),
	(5, 'Kilogram', 'kg', NULL, '2026-06-05 14:26:01.512816+00'),
	(6, 'Gram', 'g', NULL, '2026-06-05 14:26:01.512816+00'),
	(7, 'Litre', 'ltr', NULL, '2026-06-05 14:26:01.512816+00'),
	(8, 'Millilitre', 'ml', NULL, '2026-06-05 14:26:01.512816+00'),
	(9, 'Packet', 'pkt', NULL, '2026-06-05 14:26:01.512816+00'),
	(10, 'Dozen', 'dz', NULL, '2026-06-05 14:26:01.512816+00'),
	(11, 'Pair', 'pair', NULL, '2026-06-05 14:26:01.512816+00'),
	(12, 'Bag', 'bag', NULL, '2026-06-05 14:26:01.512816+00'),
	(13, 'Batch', 'batch', NULL, '2026-06-05 14:26:01.512816+00'),
	(14, 'Bundle', 'bundle', NULL, '2026-06-05 14:26:01.512816+00'),
	(15, 'Crate', 'crate', NULL, '2026-06-05 14:26:01.512816+00'),
	(16, 'Drum', 'drum', NULL, '2026-06-05 14:26:01.512816+00'),
	(17, 'Roll', 'roll', NULL, '2026-06-05 14:26:01.512816+00'),
	(18, 'Set', 'set', NULL, '2026-06-05 14:26:01.512816+00'),
	(19, 'Tin', 'tin', NULL, '2026-06-05 14:26:01.512816+00'),
	(20, 'Activity', 'act', NULL, '2026-06-05 14:26:01.512816+00'),
	(21, 'Pallet', 'pallet', NULL, '2026-06-05 14:26:01.512816+00'),
	(22, 'Ton', 't', NULL, '2026-06-05 14:26:01.512816+00'),
	(23, 'Meter', 'm', NULL, '2026-06-05 14:26:01.512816+00');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."products" ("id", "name", "category", "buying_price", "selling_price", "stock_quantity", "created_at", "category_id", "business_id", "minimum_stock", "unit_id", "has_conversion", "base_quantity", "selling_unit") VALUES
	(22, 'Amara Lotion (Big)', NULL, 6500, 8000, 15, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(28, 'Ballet Soap', NULL, 3000, 3500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(27, 'Ballet Jelly (Big)', NULL, 8333.333333333334, 9500, 7, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(23, 'Amara Lotion (Small)', NULL, 4166.666666666667, 6000, 13, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(48, 'Creamy Wipes', NULL, 4000, 5500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(47, 'Coco Pulp Oil', NULL, 3666.6666666666665, 5000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(46, 'Coco Pulp Cream (Big size)', NULL, 8333, 11000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(45, 'Coco Pulp Cream', NULL, 5166.666666666667, 6000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(44, 'CocoDerm', NULL, 4500, 5000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(43, 'Clere Men (Small)', NULL, 4000, 5000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(42, 'Clere Lotion (Small)', NULL, 5000, 6000, 5, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(41, 'Chris Adams Sprays', NULL, 8000, 10000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(40, 'Cash Cash (organic olive oil)', NULL, 4000, 5000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(39, 'Carrot Glycerine', NULL, 1500, 2000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(33, 'BodyMist (monac,divine,midnight,savage)', NULL, 12000, 15000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(37, 'Carambola ', NULL, 4333.333333333333, 5500, 6, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(36, 'Black Soap (usa)', NULL, 4180, 5000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(35, 'Boun Chou(Big)', NULL, 9167, 10000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(34, 'Boun Chou(Small)', NULL, 4333, 5000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(32, 'Body Lux Cream', NULL, 2333.3333333333335, 5000, 11, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(26, 'Ballet Jelly (Small)', NULL, 4166.666666666667, 5000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(31, 'Beauty On Cream (Big Size)', NULL, 8333, 11000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(30, 'Beauty On Oil', NULL, 4000, 5000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(21, 'Al-Rehab Lovely + Other', NULL, 6500, 10000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(20, 'Aloe vera Oil(body lux)', NULL, 1666.6666666666667, 2000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(19, 'Afro-Care Cream', NULL, 2833, 4000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(17, 'Afro-Care (50g)', NULL, 833, 1000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(29, 'Beauty On Cream(small)', NULL, 4000, 5000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(49, 'Cussons Jelly (Small)', NULL, 4166.666666666667, 5000, 5, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(24, 'Asante Soap', NULL, 4500, 6000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(25, 'Baby and Me Jelly', NULL, 3167, 5000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(16, 'Afro-Care (100g)', NULL, 1667, 2000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(18, 'Afro-Care (200g)', NULL, 3167, 4000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(38, 'Carolight (small)', NULL, 4166.666666666667, 5000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(55, 'Dettol Soap/junior', NULL, 2666.6666666666665, 3500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(69, 'Glow Cream', NULL, 3400, 4000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(59, 'Duru Soap', NULL, 3500, 4667, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(82, 'Medvine Tubes', NULL, 2166.6666666666665, 3500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(52, 'Cussons Powder (100g)', NULL, 6000, 6500, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(64, 'Fresco Oil', NULL, 3000, 4500, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(101, 'Ntale Oitment', NULL, 1667, 2000, 6, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(94, 'Musawo Soap (Big)', NULL, 2083, 3000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(50, 'Cussons Oil', NULL, 6500, 7000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(115, 'Skala Jelly 50g', NULL, 833, 1000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(116, 'Skaderm Tubes', NULL, 2666.6666666666665, 3500, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(114, 'Skala Lotion', NULL, 4000, 6000, 8, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(112, 'Shower to Shower', NULL, 4166.666666666667, 5500, 7, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(110, 'Rasasi/Royale/Feelings', NULL, 8500, 10000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(109, 'Pure White Cream (Small)', NULL, 7500, 9000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(108, 'Pucelle Mist (Small)', NULL, 4166.666666666667, 5000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(56, 'Diana Oil', NULL, 2916.6666666666665, 4000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(106, 'Pretty white (small)', NULL, 5500, 6000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(105, 'Pretty white (big)', NULL, 10833.333333333334, 13000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(104, 'Perfect Glow', NULL, 6666.666666666667, 8000, 7, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(103, 'Paw Paw Cream', NULL, 5667, 7000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(100, 'Nivea Roll On', NULL, 8333.333333333334, 9000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(99, 'Nivea Lotion', NULL, 16667, 18000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(98, 'Nisa Hair Remover', NULL, 1666.6666666666667, 2000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(96, 'Nail remover', NULL, 1250, 1500, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(93, 'Movit Herbal Soap', NULL, 2667, 3500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(92, 'Movit Herbal (50g)', NULL, 1250, 1500, 6, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(91, 'Movit Jelly small', NULL, 1166.6666666666667, 1500, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(72, 'Imperial Soap', NULL, 3333, 4000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(90, 'Movit Baby Junior (50g)', NULL, 1166.6666666666667, 1500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(88, 'Movit Body Milk', NULL, 3333, 5000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(76, 'Kyogero Jelly (Small)', NULL, 2833, 3500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(70, 'Herboline(Small)', NULL, 5333, 6000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(84, 'Miss Loy(Medium)', NULL, 6500, 8000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(83, 'Miki Clare(small)', NULL, 4000, 5000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(81, 'MCG Tubes', NULL, 3666.6666666666665, 4500, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(80, 'Lemon Vate Tube', NULL, 3500, 4000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(79, 'Lemon Clear Cream (Small)', NULL, 5666.666666666667, 7000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(78, 'Kyogero Soap', NULL, 2833, 3500, 6, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(71, 'Herboline(Medium)', NULL, 8333, 10000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(75, 'Johnson Soap', NULL, 2667, 3500, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(74, 'Johnson Oil (Small)', NULL, 5500, 6500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(73, 'Johnson Jelly (Small)', NULL, 5500, 6000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(57, 'Disproson Oil ', NULL, 3333.3333333333335, 4000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(86, 'Monac Spray(Prive)', NULL, 8000, 10000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(61, 'Fa Rollon', NULL, 4667, 6000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(68, 'Girlfriend Lotion', NULL, 6000, 7000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(67, 'Geisha Soap Black (Big)', NULL, 4667, 5000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(66, 'Geisha Soap (Big)', NULL, 3166.6666666666665, 5000, 7, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(63, 'Fogg', NULL, 13500, 15000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(62, 'Family Soap ', NULL, 3166.6666666666665, 3500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(85, 'Miss Loy(Small)', NULL, 5500, 6500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(60, 'Epiderm', NULL, 3000, 4000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(58, 'Dream Skin Cream', NULL, 7500, 9000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(89, 'Movit Baby Junior/herbal (200g)', NULL, 4333, 5000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(97, 'Naomi', NULL, 2916.6666666666665, 4000, 9, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(95, 'Nail Polish', NULL, 1166.6666666666667, 1813, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(54, 'Day & Night Cream', NULL, 3666.6666666666665, 5000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(51, 'Cussons Powder (50g)', NULL, 3750, 5000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(107, 'Princess Claire', NULL, 4000, 5000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(132, 'Victor Cream (Big)', NULL, 3666.6666666666665, 5000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(186, 'Radiant Braids Spray(B)', NULL, 4250, 5000, 5, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(182, 'Sheen Spray(Medium)', NULL, 7000, 9000, 0, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(160, 'Janet', NULL, 20000, 25000, 0, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(176, 'Afro Kinky Maki', NULL, 10000, 12000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 9, false, 1, NULL),
	(171, 'Ultra', NULL, 7000, 10000, 13, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(184, 'Movit Braids Spray(S)', NULL, 2300, 3000, 5, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(181, 'Sheen Spray(Big)', NULL, 9167, 11000, 4, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(173, 'Pamoja', NULL, 2000, 2500, 13, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(177, 'Afro Kinky Darling', NULL, 11000, 12000, 0, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 9, false, 1, NULL),
	(178, 'Afro Ropes', NULL, 350, 500, 0, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(175, 'Abuja', NULL, 2100, 2500, 5, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(174, 'Eazy Braid', NULL, 4500, 7000, 9, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(122, 'Softcare Pocket Wipes', NULL, 833, 2000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(169, 'Afro Love', NULL, 4000, 5000, 0, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(170, 'Loli Curl ', NULL, 23000, 28000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(168, 'Soft Kinky', NULL, 12000, 15000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(167, 'Apple Curl', NULL, 20000, 25000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(166, 'Sonia', NULL, 22000, 26000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(165, 'Harmony', NULL, 23000, 28000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(164, 'Mambo Locks', NULL, 14000, 19000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(162, 'Engima', NULL, 22000, 25000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(161, 'Lucky', NULL, 20000, 25000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(159, 'Pony Curls', NULL, 12000, 15000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(136, 'Sunrise', NULL, 20000, 25000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(158, 'Glamour', NULL, 12000, 15000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(157, 'Selfie', NULL, 12000, 15000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(156, 'Ruby', NULL, 12000, 15000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(155, 'Rumba', NULL, 20000, 25000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(153, 'Sera Weave', NULL, 20000, 25000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(152, 'Special Locks', NULL, 23000, 28000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(151, 'Nana', NULL, 20000, 25000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(150, 'Pearl Chrochet', NULL, 22000, 27000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(149, 'Natural Twist', NULL, 14500, 17000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(148, 'Desire Twist', NULL, 22000, 27000, 0, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(147, 'Ocean', NULL, 23000, 28000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(146, 'Sim1 Crochets', NULL, 23000, 28000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(145, 'Rona Locks', NULL, 22000, 27000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(144, 'Babe', NULL, 20000, 25000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(143, 'Natural Sleek', NULL, 20000, 25000, 0, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(141, 'Freya', NULL, 23000, 28000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(140, 'Maya', NULL, 23000, 28000, 0, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(139, 'Curly Pop', NULL, 21000, 26000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(138, 'Passion Twist', NULL, 21000, 26000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(137, 'Cairo', NULL, 16000, 18000, 5, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(183, 'Sheen Spray(Small)', NULL, 4000, 5000, 6, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(135, 'Zero pimple Soap', NULL, 3000, 3500, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(126, 'Vaseline Jelly (Big)', NULL, 8333.333333333334, 9000, 7, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(131, 'Vestline Garlic Lotion', NULL, 3166.6666666666665, 6000, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(130, 'Vestline Cream', NULL, 2667, 4000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(129, 'Vaseline Lotion (Small)', NULL, 7000, 9000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(128, 'Vaseline Lotion (Big)', NULL, 13300, 16000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(134, 'Honey Skin (Big)', NULL, 7000, 8000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(180, 'Thread', NULL, 1600, 2000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(125, 'Tumeric Oil', NULL, 15000, 20000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 0, 1, false, 1, NULL),
	(124, 'Tumeric Cream', NULL, 25000, 30000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 0, 1, false, 1, NULL),
	(179, 'Baby Wool', NULL, 900, 2000, 9, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(123, 'Sensitive  Wipes', NULL, 4500, 5500, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(120, 'Sofine Roll On', NULL, 3500, 4500, 4, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(118, 'Skin Guard Soap', NULL, 2500, 3500, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(117, 'Skin Doctor', NULL, 2333, 3500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(127, 'Vaseline Jelly (Small)', NULL, 4000, 4500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(202, 'Shampoo(20Ltrs)', NULL, 47000, 52000, 1, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 1, NULL, false, 1, NULL),
	(203, 'Shampoo(5ltrs)', NULL, 11250, 13000, 0, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 1, NULL, false, 1, NULL),
	(193, 'Movit hair Dye', NULL, 600, 1000, 13, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(256, 'Bras: 18K', NULL, 16000, 18000, 1, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(255, 'Bras: 07K', NULL, 4167, 7000, 3, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(241, 'Dress: 35K', NULL, 35000, 45000, 1, '2026-06-05 07:52:13.781406+00', 18, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(253, 'Kids Knickers Cotton', NULL, 2000, 3000, 5, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(252, 'Kids Knickers Light', NULL, 500, 1000, 8, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(251, 'Knickers: 05K L', NULL, 2000, 5000, 9, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(250, 'Knickers: 05K XXL', NULL, 2500, 5000, 5, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(249, 'Knickers: 04K L', NULL, 2000, 4000, 0, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(254, 'School Socks(White)', NULL, 2000, 3000, 2, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(247, 'Knickers: 03K L', NULL, 2000, 3000, 8, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(189, 'Movit Avacado(S)', NULL, 1167, 2000, 7, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(244, 'Dress: 50K', NULL, 50000, 60000, 0, '2026-06-05 07:52:13.781406+00', 18, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(243, 'Dress: 45K', NULL, 45000, 55000, 0, '2026-06-05 07:52:13.781406+00', 18, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(237, 'Dress: 25K', NULL, 25000, 35000, 3, '2026-06-05 07:52:13.781406+00', 18, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(240, 'Dress: 33K', NULL, 33000, 43000, 0, '2026-06-05 07:52:13.781406+00', 18, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(239, 'Dress: 30K', NULL, 30000, 40000, 0, '2026-06-05 07:52:13.781406+00', 18, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(238, 'Dress: 28K', NULL, 28000, 38000, 0, '2026-06-05 07:52:13.781406+00', 18, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(242, 'Dress: 40K', NULL, 40000, 50000, 0, '2026-06-05 07:52:13.781406+00', 18, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(194, 'Movit Black Shampoo', NULL, 600, 2000, 18, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(235, 'Dress: 15K', NULL, 15000, 25000, 3, '2026-06-05 07:52:13.781406+00', 18, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(234, 'Shoes: 30K', NULL, 30000, 38000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(233, 'Shoes: 27K', NULL, 27000, 37000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(232, 'Shoes: 25K', NULL, 25000, 30000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(231, 'Shoes: 20K', NULL, 20000, 25000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(230, 'Shoes: 18K', NULL, 18000, 22000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(229, 'Shoes: 17K', NULL, 17000, 22000, 1, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(228, 'Shoes: 16K', NULL, 16000, 20000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(227, 'Shoes: 15K', NULL, 15000, 20000, 4, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(226, 'Shoes: 14K', NULL, 14000, 18000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(224, 'Shoes: 12K', NULL, 12000, 15000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(223, 'Shoes: 11K', NULL, 11000, 14000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(221, 'Shoes: 09K', NULL, 9000, 12000, 5, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(220, 'Shoes: 08K', NULL, 8000, 10000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(219, 'Shoes: 7.5K', NULL, 7500, 10000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(218, 'Bags: 40K', NULL, 40000, 50000, 0, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(217, 'Bags: 35K', NULL, 35000, 45000, 0, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(216, 'Bags: 30K', NULL, 30000, 40000, 0, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(212, 'Bags: 18K', NULL, 18000, 28000, 3, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(201, 'Movit Sulfur', NULL, 1500, 2000, 7, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(213, 'Bags: 20K', NULL, 20000, 30000, 2, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(211, 'Bags: 17K', NULL, 17000, 27000, 3, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(245, 'Hankies', NULL, 1000, 2000, 10, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(209, 'Bags: 13K', NULL, 13000, 18000, 8, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(208, 'Bags: 10K', NULL, 10000, 15000, 1, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(207, 'Movit Pink Lotion', NULL, 2125, 4500, 3, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(206, 'Movit Hair Gel', NULL, 3333, 4500, 2, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(204, 'Shampoo(1ltr)', NULL, 2700, 3500, 0, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 1, 1, false, 1, NULL),
	(188, 'Movit Curling Lotion', NULL, 2500, 4000, 4, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(200, 'Movit hair Food', NULL, 1167, 2000, 0, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(199, 'Leave-In(B)', NULL, 8333, 10000, 0, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(248, 'Knickers: 04K XXL', NULL, 2000, 4000, 11, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(196, 'Enazi(B)', NULL, 3000, 4000, 1, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(195, 'Black Shampoo Hena', NULL, 800, 2000, 5, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(191, 'Movit Leave-in (S)', NULL, 2500, 4000, 9, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(210, 'Bags: 15K', NULL, 15000, 25000, 20, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(222, 'Shoes: 10K', NULL, 10000, 14000, 31, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 11, false, 1, NULL),
	(197, 'Enazi(S)', NULL, 1250, 2000, 1, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(187, 'Radiant Braids Spray(S)', NULL, 2500, 3000, 8, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(214, 'Bags: 25K', NULL, 25000, 35000, 2, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(113, 'Skala Cream', NULL, 2666.6666666666665, 4000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(268, 'Hair Bands Beaded ', NULL, 1500, 3000, 10, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(267, 'Hair Bands (S)', NULL, 1000, 2000, 2, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(119, 'Skin Balance', NULL, 4333, 5000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(172, 'Zanzi', NULL, 4500, 7000, 29, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(192, 'Movit Cold Wave(S)', NULL, 3250, 4500, 2, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(265, 'Combs (M)', NULL, 667, 1000, 0, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(87, 'Moroco Cream', NULL, 6000, 8000, 1, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(263, 'Lip Balm', NULL, 833, 1500, 0, '2026-06-05 07:52:13.781406+00', 20, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(262, 'Foundation', NULL, 2500, 4000, 2, '2026-06-05 07:52:13.781406+00', 20, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(261, 'Eye Pencil (S)', NULL, 667, 1000, 7, '2026-06-05 07:52:13.781406+00', 20, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(259, 'Pop', NULL, 1000, 2000, 1, '2026-06-05 07:52:13.781406+00', 20, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(281, 'Necklaces', NULL, 1500, 2500, 3, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(284, 'Movit Herbal Relaxer 2KG', NULL, 26000, 30000, 1, '2026-06-05 10:08:10.108591+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 0, 19, false, 1, NULL),
	(283, 'Movit Curl Activator 360GM', NULL, 4500, 5000, 6, '2026-06-05 10:06:46.267746+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 19, false, 1, NULL),
	(282, 'Movit Hair Oil', NULL, 4200, 5000, 1, '2026-06-05 09:49:13.974633+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(280, 'Rubber Bands', NULL, 667, 1000, 12, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(279, 'Hair Metals (Gold/Silver)', NULL, 1500, 2500, 2, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(278, 'Sea Beads', NULL, 1500, 2500, 16, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 9, false, 1, NULL),
	(236, 'Dress: 20K', NULL, 20000, 30000, 8, '2026-06-05 07:52:13.781406+00', 18, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(276, 'Puff Holder Clips', NULL, 1000, 2000, 12, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(275, 'Puff Holder (Bowtie)', NULL, 1500, 3000, 2, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(274, 'Puff Holder (baby)', NULL, 1500, 2000, 0, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(273, 'Puff Holder (2pc)', NULL, 1000, 2000, 0, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(272, 'Puff Holder(Stretch)', NULL, 500, 1000, 5, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(264, 'Combs (S)', NULL, 667, 1000, 9, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(270, 'Wig Caps', NULL, 1000, 2000, 6, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(258, 'Lip Stick', NULL, 2500, 4000, 4, '2026-06-05 07:52:13.781406+00', 20, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(185, 'Movit Braids Spray(B)', NULL, 3700, 5000, 8, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(246, 'Knickers: 03K XXL', NULL, 2000, 3000, 0, '2026-06-05 07:52:13.781406+00', 19, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL),
	(225, 'Shoes: 13K', NULL, 13000, 17000, 0, '2026-06-05 07:52:13.781406+00', 17, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 11, false, 1, NULL),
	(215, 'Bags: 26K', NULL, 26000, 36000, 0, '2026-06-05 07:52:13.781406+00', 16, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(205, 'Movit Relaxer (S)', NULL, 2500, 4500, 4, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(154, 'Pony Braid Short', NULL, 14000, 16000, 0, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(163, 'Taylor', NULL, 23000, 28000, 1, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(142, 'Gena Crochet', NULL, 23000, 28000, 2, '2026-06-05 07:52:13.781406+00', 14, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(133, 'White Secret (Small)', NULL, 6666.666666666667, 8000, 6, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(121, 'Softcare Wipes', NULL, 4500, 6000, 0, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(102, 'Originals Body Wips(olive oil)', NULL, 22000, 25000, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(77, 'Kyogero Jelly (Big)', NULL, 3833, 5000, 3, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(53, 'Cussons Soap', NULL, 2666.6666666666665, 3500, 8, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(257, 'Lip Gloss', NULL, 1000, 2000, 9, '2026-06-05 07:52:13.781406+00', 20, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(198, 'Pressol', NULL, 1333, 2000, 0, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 2, 1, false, 1, NULL),
	(260, 'Eye Pencil (B)', NULL, 1000, 2000, 2, '2026-06-05 07:52:13.781406+00', 20, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(269, 'Nets', NULL, 1000, 2000, 4, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(277, 'Beads', NULL, 1000, 3000, 17, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 9, false, 1, NULL),
	(266, 'Combs (B)', NULL, 500, 1000, 8, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(65, 'Geisha Soap (Small)', NULL, 2166.6666666666665, 2500, 2, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(111, 'Rwanda Glycerine Mix', NULL, 1666.6666666666667, 2000, 10, '2026-06-05 07:52:13.781406+00', 13, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(271, 'Puff Holder Cloth', NULL, 1000, 2000, 0, '2026-06-05 07:52:13.781406+00', 21, '3804a347-60f3-415a-aff1-052ec4a6f461', 3, 1, false, 1, NULL),
	(190, 'Movit Curl Activaor/Super Curl(S)', NULL, 1000, 2000, 11, '2026-06-05 07:52:13.781406+00', 15, '3804a347-60f3-415a-aff1-052ec4a6f461', 5, 1, false, 1, NULL);


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "username", "full_name", "role", "active", "created_at") VALUES
	('fe8ea687-56f3-4196-a842-d6277d16b66e', 'admin', 'System Administrator', 'Admin', true, '2026-05-22 07:39:49.890253+00'),
	('c5616835-075b-4d50-b424-1282df4c4855', 'staff', 'New User', 'Cashier', true, '2026-05-22 12:37:11.584493+00'),
	('7af3a293-bf1f-40c7-925e-683ff23d9fe3', 'adminb', 'New User', 'Cashier', true, '2026-05-30 09:33:16.144769+00'),
	('6b68c38a-b9b7-4c92-8600-1c28beb68691', 'staffb', 'New User', 'Cashier', true, '2026-06-01 10:56:10.352238+00');


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."purchases" ("id", "product_id", "quantity", "buying_price", "total_amount", "created_at", "purchase_date", "business_id") VALUES
	(10, 283, 6, 4500, 27000, '2026-06-05 10:10:19.80422+00', '2026-06-04', '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(11, 284, 1, 26000, 26000, '2026-06-05 10:10:53.969621+00', '2026-06-04', '3804a347-60f3-415a-aff1-052ec4a6f461');


--
-- Data for Name: rentals; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."sales" ("id", "product_id", "quantity", "selling_price", "total_amount", "profit", "created_at", "sale_date", "cost_amount", "business_id") VALUES
	(62, 193, 1, 1000, 1000, 400, '2026-06-10 08:09:21.365599+00', '2026-06-07', 600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(63, 194, 1, 1500, 1500, 900, '2026-06-10 08:11:37.01224+00', '2026-06-07', 600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(64, 186, 2, 5000, 10000, 1500, '2026-06-10 08:13:43.476124+00', '2026-06-07', 8500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(65, 214, 1, 30000, 30000, 5000, '2026-06-10 08:16:34.650014+00', '2026-06-07', 25000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(66, 160, 1, 25000, 25000, 5000, '2026-06-10 08:16:51.849544+00', '2026-06-07', 20000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(67, 222, 1, 14000, 14000, 4000, '2026-06-10 08:17:14.639693+00', '2026-06-07', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(68, 24, 1, 6000, 6000, 1500, '2026-06-10 08:17:27.448802+00', '2026-06-07', 4500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(69, 180, 1, 2000, 2000, 400, '2026-06-10 08:18:05.772241+00', '2026-06-07', 1600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(14, 46, 1, 11000, 11000, 2667, '2026-06-05 09:06:13.60594+00', '2026-06-01', 8333, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(15, 111, 1, 2000, 2000, 333.33333333333326, '2026-06-05 09:08:27.486098+00', '2026-06-01', 1666.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(16, 24, 3, 6000, 18000, 4500, '2026-06-05 09:11:20.431449+00', '2026-06-01', 13500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(17, 72, 1, 4000, 4000, 667, '2026-06-05 09:12:06.063744+00', '2026-06-01', 3333, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(18, 96, 2, 2000, 4000, 1500, '2026-06-05 09:13:00.96094+00', '2026-06-01', 2500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(19, 60, 1, 4000, 4000, 1000, '2026-06-05 09:13:31.287641+00', '2026-06-01', 3000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(20, 83, 1, 5000, 5000, 1000, '2026-06-05 09:14:07.969509+00', '2026-06-01', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(21, 271, 1, 2000, 2000, 1000, '2026-06-05 09:15:54.208012+00', '2026-06-01', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(22, 95, 3, 2000, 6000, 2500, '2026-06-05 09:16:53.218092+00', '2026-06-01', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(23, 98, 1, 2000, 2000, 333.33333333333326, '2026-06-05 09:17:20.177192+00', '2026-06-01', 1666.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(24, 102, 1, 25000, 25000, 3000, '2026-06-05 09:17:44.576328+00', '2026-06-01', 22000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(25, 121, 2, 6000, 12000, 3000, '2026-06-05 09:19:33.63852+00', '2026-06-02', 9000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(26, 134, 2, 8000, 16000, 2000, '2026-06-05 09:20:01.687632+00', '2026-06-02', 14000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(27, 95, 1, 2000, 2000, 833.3333333333333, '2026-06-05 09:22:01.672136+00', '2026-06-02', 1166.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(28, 184, 1, 3000, 3000, 700, '2026-06-05 09:23:20.099168+00', '2026-06-02', 2300, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(29, 183, 1, 5000, 5000, 1000, '2026-06-05 09:24:10.406399+00', '2026-06-02', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(30, 111, 1, 2000, 2000, 333.33333333333326, '2026-06-05 09:24:29.348772+00', '2026-06-02', 1666.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(31, 53, 1, 3500, 3500, 833.3333333333335, '2026-06-05 09:24:50.737466+00', '2026-06-02', 2666.6666666666665, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(32, 51, 1, 5000, 5000, 1250, '2026-06-05 09:25:22.791155+00', '2026-06-02', 3750, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(33, 116, 1, 4000, 4000, 1333.3333333333335, '2026-06-05 09:25:52.190903+00', '2026-06-02', 2666.6666666666665, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(34, 198, 1, 2000, 2000, 667, '2026-06-05 09:27:21.217223+00', '2026-06-03', 1333, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(35, 257, 2, 2000, 4000, 2000, '2026-06-05 09:27:44.262105+00', '2026-06-03', 2000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(36, 269, 1, 2000, 2000, 1000, '2026-06-05 09:30:03.768409+00', '2026-06-03', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(37, 43, 1, 5000, 5000, 1000, '2026-06-05 09:30:43.120588+00', '2026-06-04', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(38, 111, 1, 2000, 2000, 333.33333333333326, '2026-06-05 09:30:58.458748+00', '2026-06-04', 1666.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(39, 45, 1, 6000, 6000, 833.333333333333, '2026-06-05 09:31:54.236378+00', '2026-06-04', 5166.666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(40, 190, 1, 1500, 1500, 500, '2026-06-05 09:46:48.84793+00', '2026-06-01', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(41, 189, 1, 2000, 2000, 833, '2026-06-05 09:47:48.839729+00', '2026-06-03', 1167, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(42, 282, 1, 6000, 6000, 1800, '2026-06-05 09:50:02.156512+00', '2026-06-04', 4200, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(45, 29, 1, 5000, 5000, 1000, '2026-06-10 07:12:20.024394+00', '2026-06-05', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(46, 111, 1, 2000, 2000, 333.33333333333326, '2026-06-10 07:13:04.254893+00', '2026-06-05', 1666.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(47, 49, 1, 5000, 5000, 833.333333333333, '2026-06-10 07:13:30.685721+00', '2026-06-05', 4166.666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(48, 260, 1, 2000, 2000, 1000, '2026-06-10 07:18:04.699076+00', '2026-06-05', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(49, 190, 1, 2000, 2000, 1000, '2026-06-10 07:19:11.146549+00', '2026-06-06', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(50, 193, 1, 1000, 1000, 400, '2026-06-10 07:27:35.69082+00', '2026-06-06', 600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(51, 198, 1, 2000, 2000, 667, '2026-06-10 07:28:52.060687+00', '2026-06-06', 1333, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(52, 127, 1, 4500, 4500, 500, '2026-06-10 07:29:16.136148+00', '2026-06-06', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(53, 210, 1, 25000, 25000, 10000, '2026-06-10 07:29:55.353572+00', '2026-06-06', 15000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(54, 222, 1, 14000, 14000, 4000, '2026-06-10 07:30:19.640661+00', '2026-06-06', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(55, 222, 1, 15000, 15000, 5000, '2026-06-10 07:32:36.291332+00', '2026-06-06', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(56, 87, 1, 8000, 8000, 2000, '2026-06-10 07:33:50.58657+00', '2026-06-06', 6000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(57, 97, 1, 4000, 4000, 1083.3333333333335, '2026-06-10 07:57:09.226662+00', '2026-06-06', 2916.6666666666665, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(58, 134, 1, 8000, 8000, 1000, '2026-06-10 07:57:25.343504+00', '2026-06-06', 7000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(59, 64, 1, 5000, 5000, 2000, '2026-06-10 07:57:45.27407+00', '2026-06-06', 3000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(60, 126, 1, 9000, 9000, 666.6666666666661, '2026-06-10 07:58:01.721846+00', '2026-06-06', 8333.333333333334, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(61, 275, 1, 3000, 3000, 1500, '2026-06-10 07:59:43.310954+00', '2026-06-06', 1500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(70, 61, 1, 7000, 7000, 2333, '2026-06-10 08:18:38.067694+00', '2026-06-07', 4667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(71, 184, 1, 3000, 3000, 700, '2026-06-10 08:21:22.653088+00', '2026-06-07', 2300, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(72, 122, 1, 2000, 2000, 1167, '2026-06-10 08:23:34.489196+00', '2026-06-07', 833, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(73, 185, 1, 5000, 5000, 1300, '2026-06-10 08:24:37.436709+00', '2026-06-07', 3700, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(74, 201, 1, 2000, 2000, 500, '2026-06-10 08:25:58.908048+00', '2026-06-07', 1500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(75, 173, 3, 2500, 7500, 1500, '2026-06-10 08:27:56.643339+00', '2026-06-07', 6000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(76, 194, 1, 2000, 2000, 1400, '2026-06-10 08:28:37.326896+00', '2026-06-07', 600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(77, 269, 1, 2000, 2000, 1000, '2026-06-10 08:29:30.860232+00', '2026-06-07', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(78, 214, 1, 35000, 35000, 10000, '2026-06-10 08:32:51.489529+00', '2026-06-08', 25000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(79, 222, 1, 13000, 13000, 3000, '2026-06-10 08:34:09.828704+00', '2026-06-08', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(80, 180, 1, 2000, 2000, 400, '2026-06-10 08:34:34.447775+00', '2026-06-08', 1600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(81, 134, 1, 8000, 8000, 1000, '2026-06-10 08:34:57.661687+00', '2026-06-08', 7000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(82, 85, 1, 6500, 6500, 1000, '2026-06-10 08:35:12.551586+00', '2026-06-08', 5500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(83, 154, 1, 16000, 16000, 2000, '2026-06-10 08:36:47.878409+00', '2026-06-08', 14000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(84, 201, 1, 2000, 2000, 500, '2026-06-10 08:40:20.94751+00', '2026-06-08', 1500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(85, 271, 1, 2000, 2000, 1000, '2026-06-10 08:41:10.128425+00', '2026-06-08', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(86, 269, 1, 2000, 2000, 1000, '2026-06-10 08:41:37.195018+00', '2026-06-08', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(87, 189, 1, 1500, 1500, 333, '2026-06-10 08:43:47.417798+00', '2026-06-08', 1167, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(88, 70, 1, 6000, 6000, 667, '2026-06-10 08:48:02.201964+00', '2026-06-08', 5333, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(89, 181, 1, 11000, 11000, 1833, '2026-06-10 08:48:42.858928+00', '2026-06-08', 9167, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(90, 171, 2, 10000, 20000, 6000, '2026-06-10 08:49:17.59819+00', '2026-06-08', 14000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(91, 185, 1, 5000, 5000, 1300, '2026-06-10 08:52:41.898326+00', '2026-06-08', 3700, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(92, 181, 1, 11000, 11000, 1833, '2026-06-10 08:54:12.783449+00', '2026-06-09', 9167, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(93, 86, 1, 10000, 10000, 2000, '2026-06-10 08:57:22.52546+00', '2026-06-09', 8000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(94, 134, 1, 8000, 8000, 1000, '2026-06-10 08:57:35.722213+00', '2026-06-09', 7000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(95, 136, 1, 24000, 24000, 4000, '2026-06-10 08:58:11.820095+00', '2026-06-09', 20000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(96, 186, 1, 5000, 5000, 750, '2026-06-10 08:59:30.920968+00', '2026-06-09', 4250, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(97, 257, 1, 2000, 2000, 1000, '2026-06-10 09:01:28.181128+00', '2026-06-09', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(98, 247, 1, 3000, 3000, 1000, '2026-06-15 10:18:50.82346+00', '2026-06-10', 2000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(99, 248, 2, 4000, 8000, 4000, '2026-06-15 10:22:15.366518+00', '2026-06-10', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(100, 113, 1, 4000, 4000, 1333.3333333333335, '2026-06-15 10:24:25.898508+00', '2026-06-10', 2666.6666666666665, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(101, 18, 1, 4000, 4000, 833, '2026-06-15 10:26:32.974088+00', '2026-06-10', 3167, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(102, 183, 1, 5000, 5000, 1000, '2026-06-15 10:26:52.675834+00', '2026-06-10', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(103, 25, 1, 5000, 5000, 1833, '2026-06-15 10:27:08.373201+00', '2026-06-10', 3167, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(104, 254, 1, 3000, 3000, 1000, '2026-06-15 10:28:04.943668+00', '2026-06-11', 2000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(105, 237, 1, 33000, 33000, 8000, '2026-06-15 10:28:32.342581+00', '2026-06-11', 25000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(106, 76, 1, 3500, 3500, 667, '2026-06-15 10:30:32.641674+00', '2026-06-11', 2833, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(107, 194, 1, 2000, 2000, 1400, '2026-06-15 10:31:50.292191+00', '2026-06-11', 600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(108, 16, 1, 2000, 2000, 333, '2026-06-15 10:36:08.56394+00', '2026-06-11', 1667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(109, 190, 1, 2000, 2000, 1000, '2026-06-15 10:39:21.759378+00', '2026-06-11', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(110, 190, 1, 1500, 1500, 500, '2026-06-15 10:40:19.076189+00', '2026-06-12', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(111, 222, 1, 14000, 14000, 4000, '2026-06-15 10:41:01.064023+00', '2026-06-12', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(112, 122, 1, 2000, 2000, 1167, '2026-06-15 10:42:13.936902+00', '2026-06-12', 833, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(114, 71, 1, 10000, 10000, 1667, '2026-06-15 10:42:57.426764+00', '2026-06-12', 8333, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(115, 55, 1, 3500, 3500, 833.3333333333335, '2026-06-15 10:43:15.462548+00', '2026-06-12', 2666.6666666666665, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(116, 264, 1, 1000, 1000, 333, '2026-06-15 10:43:47.801722+00', '2026-06-12', 667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(117, 266, 1, 1000, 1000, 500, '2026-06-15 10:44:09.197489+00', '2026-06-12', 500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(118, 176, 1, 12000, 12000, 2000, '2026-06-15 10:44:37.856842+00', '2026-06-12', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(119, 178, 7, 500, 3500, 1050, '2026-06-15 10:48:23.934524+00', '2026-06-12', 2450, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(120, 197, 1, 2000, 2000, 750, '2026-06-15 10:49:59.527928+00', '2026-06-13', 1250, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(121, 172, 3, 6000, 18000, 4500, '2026-06-15 10:50:53.139501+00', '2026-06-13', 13500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(122, 197, 1, 2000, 2000, 750, '2026-06-15 10:51:45.538418+00', '2026-06-13', 1250, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(123, 183, 1, 5000, 5000, 1000, '2026-06-15 10:52:24.63343+00', '2026-06-13', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(124, 97, 1, 4000, 4000, 1083.3333333333335, '2026-06-15 10:52:53.819437+00', '2026-06-13', 2916.6666666666665, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(125, 107, 1, 5000, 5000, 1000, '2026-06-15 10:53:37.525898+00', '2026-06-13', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(126, 18, 1, 4000, 4000, 833, '2026-06-15 10:54:00.739058+00', '2026-06-13', 3167, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(127, 270, 1, 2000, 2000, 1000, '2026-06-15 10:54:44.532449+00', '2026-06-13', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(128, 56, 1, 4000, 4000, 1083.3333333333335, '2026-06-15 10:55:07.047205+00', '2026-06-13', 2916.6666666666665, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(129, 69, 1, 4000, 4000, 600, '2026-06-15 10:55:23.98131+00', '2026-06-13', 3400, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(130, 183, 1, 5000, 5000, 1000, '2026-06-15 10:56:14.813971+00', '2026-06-13', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(131, 248, 1, 4000, 4000, 2000, '2026-06-15 10:57:12.905622+00', '2026-06-13', 2000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(132, 247, 1, 3000, 3000, 1000, '2026-06-15 10:58:59.124798+00', '2026-06-13', 2000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(133, 61, 1, 6000, 6000, 1333, '2026-06-15 10:59:19.020081+00', '2026-06-13', 4667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(134, 197, 1, 2000, 2000, 750, '2026-06-15 10:59:53.497308+00', '2026-06-14', 1250, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(135, 183, 1, 5000, 5000, 1000, '2026-06-15 11:00:22.66277+00', '2026-06-14', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(136, 236, 1, 25000, 25000, 5000, '2026-06-15 11:04:01.317346+00', '2026-06-14', 20000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(137, 275, 1, 3000, 3000, 1500, '2026-06-15 11:04:44.041363+00', '2026-06-14', 1500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(138, 277, 1, 2000, 2000, 1000, '2026-06-15 11:05:12.324559+00', '2026-06-14', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(139, 248, 1, 4000, 4000, 2000, '2026-06-15 11:05:42.855954+00', '2026-06-14', 2000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(140, 180, 1, 2000, 2000, 400, '2026-06-15 11:05:58.940404+00', '2026-06-14', 1600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(141, 173, 1, 2500, 2500, 500, '2026-06-15 11:07:13.215386+00', '2026-06-14', 2000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(142, 191, 1, 4500, 4500, 2000, '2026-06-15 11:08:31.2323+00', '2026-06-14', 2500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(143, 123, 1, 5500, 5500, 1000, '2026-06-15 11:08:44.7691+00', '2026-06-14', 4500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(144, 90, 1, 1500, 1500, 333.33333333333326, '2026-06-15 11:09:08.123271+00', '2026-06-14', 1166.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(145, 257, 1, 2000, 2000, 1000, '2026-06-15 11:09:46.478343+00', '2026-06-14', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(146, 185, 1, 5000, 5000, 1300, '2026-06-15 11:10:47.750662+00', '2026-06-14', 3700, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(147, 222, 1, 15000, 15000, 5000, '2026-06-15 11:12:38.930049+00', '2026-06-14', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(148, 214, 1, 30000, 30000, 5000, '2026-06-24 12:03:17.615571+00', '2026-06-15', 25000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(149, 201, 1, 2000, 2000, 500, '2026-06-24 12:42:21.575378+00', '2026-06-15', 1500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(150, 111, 1, 2000, 2000, 333.33333333333326, '2026-06-24 12:42:47.502674+00', '2026-06-16', 1666.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(151, 183, 1, 5000, 5000, 1000, '2026-06-24 12:43:06.515289+00', '2026-06-16', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(152, 38, 1, 5000, 5000, 833.333333333333, '2026-06-24 12:43:26.173516+00', '2026-06-16', 4166.666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(153, 193, 1, 1000, 1000, 400, '2026-06-24 12:43:49.09976+00', '2026-06-16', 600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(154, 72, 1, 4000, 4000, 667, '2026-06-24 12:44:06.326621+00', '2026-06-16', 3333, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(155, 237, 1, 32000, 32000, 7000, '2026-06-24 12:44:31.386255+00', '2026-06-16', 25000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(156, 237, 1, 35000, 35000, 10000, '2026-06-24 12:44:49.970253+00', '2026-06-16', 25000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(157, 113, 1, 4000, 4000, 1333.3333333333335, '2026-06-24 12:45:58.24611+00', '2026-06-16', 2666.6666666666665, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(158, 236, 1, 30000, 30000, 10000, '2026-06-24 12:47:12.022985+00', '2026-06-17', 20000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(159, 236, 1, 28000, 28000, 8000, '2026-06-24 12:47:35.405644+00', '2026-06-17', 20000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(160, 245, 1, 2000, 2000, 1000, '2026-06-24 12:48:59.993759+00', '2026-06-17', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(161, 270, 1, 2000, 2000, 1000, '2026-06-24 12:49:24.21131+00', '2026-06-17', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(162, 173, 3, 2500, 7500, 1500, '2026-06-24 12:49:42.825295+00', '2026-06-17', 6000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(163, 57, 1, 4000, 4000, 666.6666666666665, '2026-06-24 12:51:02.568298+00', '2026-06-17', 3333.3333333333335, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(164, 186, 1, 5000, 5000, 750, '2026-06-24 12:51:20.901352+00', '2026-06-17', 4250, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(165, 257, 1, 2000, 2000, 1000, '2026-06-24 12:51:41.715089+00', '2026-06-17', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(166, 122, 1, 2000, 2000, 1167, '2026-06-24 12:51:58.50357+00', '2026-06-17', 833, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(167, 189, 1, 2000, 2000, 833, '2026-06-24 12:52:17.421181+00', '2026-06-17', 1167, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(168, 179, 1, 2000, 2000, 1100, '2026-06-24 12:52:40.776093+00', '2026-06-17', 900, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(169, 277, 3, 3000, 9000, 6000, '2026-06-24 12:53:48.978801+00', '2026-06-17', 3000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(170, 192, 1, 4500, 4500, 1250, '2026-06-24 12:54:07.549621+00', '2026-06-18', 3250, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(171, 193, 1, 1000, 1000, 400, '2026-06-24 12:54:27.347797+00', '2026-06-18', 600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(172, 190, 1, 1500, 1500, 500, '2026-06-24 12:55:10.80676+00', '2026-06-18', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(173, 172, 1, 7000, 7000, 2500, '2026-06-24 12:55:28.790351+00', '2026-06-18', 4500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(174, 201, 1, 2000, 2000, 500, '2026-06-24 12:56:23.733385+00', '2026-06-18', 1500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(175, 214, 1, 30000, 30000, 5000, '2026-06-24 12:56:54.558592+00', '2026-06-18', 25000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(176, 188, 1, 4500, 4500, 2000, '2026-06-24 12:57:24.245134+00', '2026-06-18', 2500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(177, 192, 1, 4500, 4500, 1250, '2026-06-24 12:57:40.129768+00', '2026-06-18', 3250, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(178, 87, 1, 8000, 8000, 2000, '2026-06-24 12:59:07.00548+00', '2026-06-19', 6000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(179, 181, 1, 11000, 11000, 1833, '2026-06-24 12:59:23.394158+00', '2026-06-19', 9167, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(180, 89, 1, 5500, 5500, 1167, '2026-06-24 13:01:15.994531+00', '2026-06-19', 4333, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(181, 194, 1, 1500, 1500, 900, '2026-06-24 13:01:42.416813+00', '2026-06-19', 600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(182, 95, 1, 2000, 2000, 833.3333333333333, '2026-06-24 13:02:10.82206+00', '2026-06-19', 1166.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(183, 173, 2, 2500, 5000, 1000, '2026-06-24 13:02:28.144114+00', '2026-06-19', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(184, 185, 1, 5000, 5000, 1300, '2026-06-24 13:03:48.712495+00', '2026-06-19', 3700, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(185, 22, 1, 8000, 8000, 1500, '2026-06-24 13:04:02.516832+00', '2026-06-19', 6500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(186, 23, 1, 6000, 6000, 1833.333333333333, '2026-06-24 13:04:17.319115+00', '2026-06-19', 4166.666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(187, 23, 1, 6000, 6000, 1833.333333333333, '2026-06-24 13:04:17.619465+00', '2026-06-19', 4166.666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(188, 111, 1, 2000, 2000, 333.33333333333326, '2026-06-24 13:04:35.604787+00', '2026-06-19', 1666.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(189, 275, 1, 3000, 3000, 1500, '2026-06-24 13:07:01.20375+00', '2026-06-19', 1500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(190, 260, 1, 1500, 1500, 500, '2026-06-24 13:07:16.83182+00', '2026-06-19', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(191, 69, 1, 4000, 4000, 600, '2026-06-24 13:07:31.047934+00', '2026-06-19', 3400, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(192, 97, 1, 4000, 4000, 1083.3333333333335, '2026-06-24 13:07:48.968096+00', '2026-06-19', 2916.6666666666665, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(193, 65, 1, 2700, 2700, 533.3333333333335, '2026-06-24 13:08:18.630394+00', '2026-06-19', 2166.6666666666665, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(194, 173, 2, 2500, 5000, 1000, '2026-06-24 13:08:41.752683+00', '2026-06-20', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(195, 194, 1, 2000, 2000, 1400, '2026-06-24 13:09:36.05888+00', '2026-06-20', 600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(196, 193, 2, 1000, 2000, 800, '2026-06-24 13:10:47.484959+00', '2026-06-20', 1200, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(197, 169, 1, 5000, 5000, 1000, '2026-06-24 13:11:06.885022+00', '2026-06-20', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(198, 183, 1, 5000, 5000, 1000, '2026-06-24 13:11:27.89278+00', '2026-06-20', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(199, 111, 1, 2000, 2000, 333.33333333333326, '2026-06-24 13:11:45.732761+00', '2026-06-20', 1666.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(200, 95, 2, 2000, 4000, 1666.6666666666665, '2026-06-24 13:12:10.302592+00', '2026-06-20', 2333.3333333333335, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(201, 179, 4, 2000, 8000, 4400, '2026-06-24 13:16:10.629245+00', '2026-06-21', 3600, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(202, 271, 1, 2000, 2000, 1000, '2026-06-24 13:17:38.895793+00', '2026-06-21', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(204, 186, 1, 5000, 5000, 750, '2026-06-24 13:19:23.098058+00', '2026-06-21', 4250, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(203, 194, 2, 2000, 4000, 2800, '2026-06-24 13:18:29.874212+00', '2026-06-21', 1200, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(205, 33, 1, 15000, 15000, 3000, '2026-06-24 13:21:13.180243+00', '2026-06-21', 12000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(206, 190, 1, 2000, 2000, 1000, '2026-06-24 13:21:52.958245+00', '2026-06-22', 1000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(207, 122, 1, 2000, 2000, 1167, '2026-06-24 13:22:10.855705+00', '2026-06-22', 833, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(208, 90, 1, 1500, 1500, 333.33333333333326, '2026-06-24 13:29:37.826431+00', '2026-06-22', 1166.6666666666667, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(209, 183, 1, 5000, 5000, 1000, '2026-06-24 13:30:47.292907+00', '2026-06-23', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461');


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."services" ("id", "business_id", "name", "cost_price", "selling_price", "active", "created_at") OVERRIDING SYSTEM VALUE VALUES
	(3, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Leisure Curls', 11000.00, 20000.00, true, '2026-06-05 07:31:58.036922+00'),
	(4, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Retouch', 12500.00, 20000.00, true, '2026-06-05 07:32:23.679232+00'),
	(5, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Blow Out', 3500.00, 6000.00, true, '2026-06-05 07:32:42.157606+00'),
	(6, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Hot Comb(Cold Water)', 3500.00, 5000.00, true, '2026-06-05 07:33:02.247223+00'),
	(7, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Hot Comb(Hot Water)', 4500.00, 7000.00, true, '2026-06-05 07:33:20.084733+00'),
	(8, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Plaiting 10K', 5000.00, 10000.00, true, '2026-06-05 07:33:39.184454+00'),
	(9, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Plaiting 12K', 6000.00, 12000.00, true, '2026-06-05 07:37:32.102412+00'),
	(10, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Plaiting 15K', 7500.00, 15000.00, true, '2026-06-05 07:37:54.561655+00'),
	(11, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Plaiting 20K', 10000.00, 20000.00, true, '2026-06-05 07:38:16.397469+00'),
	(12, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Plaiting 25K', 13000.00, 25000.00, true, '2026-06-05 07:38:40.684896+00'),
	(13, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Plaiting 30K', 20000.00, 30000.00, true, '2026-06-05 07:38:57.460652+00'),
	(14, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Plaiting 35K', 20000.00, 35000.00, true, '2026-06-05 07:39:14.483809+00'),
	(15, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Styling', 500.00, 2000.00, true, '2026-06-05 07:39:40.572313+00'),
	(16, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Gel', 6500.00, 10000.00, true, '2026-06-05 07:39:59.737388+00'),
	(17, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Plaiting 8K', 4000.00, 8000.00, true, '2026-06-10 08:07:58.566356+00'),
	(18, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Plaiting 17K', 8500.00, 17000.00, true, '2026-06-24 13:45:58.469041+00'),
	(19, '3804a347-60f3-415a-aff1-052ec4a6f461', 'Plaiting 5K/6K', 3000.00, 6000.00, true, '2026-06-24 13:46:56.515098+00');


--
-- Data for Name: service_sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."service_sales" ("id", "service_id", "quantity", "selling_price", "total_amount", "profit", "created_at", "service_date", "cost_amount", "business_id") VALUES
	(3, 10, 1, 15000, 15000, 7500, '2026-06-05 09:14:47.374769+00', '2026-06-01', 7500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(4, 6, 1, 5000, 5000, 1500, '2026-06-05 09:29:30.12088+00', '2026-06-03', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(5, 6, 1, 5000, 5000, 1500, '2026-06-05 09:34:08.444822+00', '2026-06-04', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(6, 6, 1, 6000, 6000, 2500, '2026-06-05 09:34:35.484602+00', '2026-06-04', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(7, 8, 1, 10000, 10000, 5000, '2026-06-10 08:00:11.181254+00', '2026-06-06', 5000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(8, 7, 1, 7000, 7000, 2500, '2026-06-10 08:00:29.777842+00', '2026-06-06', 4500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(9, 6, 2, 5000, 10000, 3000, '2026-06-10 08:00:49.645655+00', '2026-06-06', 7000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(10, 17, 1, 8000, 8000, 4000, '2026-06-10 08:08:25.299584+00', '2026-06-06', 4000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(11, 11, 1, 20000, 20000, 10000, '2026-06-10 08:29:48.009642+00', '2026-06-07', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(12, 13, 1, 30000, 30000, 10000, '2026-06-10 08:37:05.036433+00', '2026-06-08', 20000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(14, 8, 1, 10000, 10000, 5000, '2026-06-10 09:00:23.072044+00', '2026-06-09', 5000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(13, 6, 2, 5000, 10000, 3000, '2026-06-10 08:54:33.43135+00', '2026-06-09', 7000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(15, 5, 1, 5000, 5000, 1500, '2026-06-15 10:30:59.066784+00', '2026-06-11', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(16, 6, 1, 5000, 5000, 1500, '2026-06-15 10:39:35.471051+00', '2026-06-11', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(17, 12, 1, 25000, 25000, 12000, '2026-06-15 10:49:17.209125+00', '2026-06-12', 13000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(18, 7, 1, 6000, 6000, 1500, '2026-06-15 10:51:13.737746+00', '2026-06-13', 4500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(19, 6, 1, 5000, 5000, 1500, '2026-06-15 10:53:09.18229+00', '2026-06-13', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(20, 8, 1, 10000, 10000, 5000, '2026-06-15 10:55:48.668284+00', '2026-06-13', 5000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(21, 8, 1, 10000, 10000, 5000, '2026-06-15 11:06:31.385808+00', '2026-06-14', 5000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(23, 6, 1, 5000, 5000, 1500, '2026-06-15 11:11:07.77633+00', '2026-06-14', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(22, 8, 2, 10000, 20000, 10000, '2026-06-15 11:09:25.217101+00', '2026-06-14', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(24, 7, 1, 10000, 10000, 5500, '2026-06-15 11:14:26.870005+00', '2026-06-14', 4500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(25, 8, 1, 10000, 10000, 5000, '2026-06-24 12:46:24.58273+00', '2026-06-16', 5000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(26, 6, 1, 5000, 5000, 1500, '2026-06-24 12:46:37.003025+00', '2026-06-16', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(27, 10, 1, 15000, 15000, 7500, '2026-06-24 12:50:00.915225+00', '2026-06-17', 7500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(28, 11, 1, 20000, 20000, 10000, '2026-06-24 12:55:53.038649+00', '2026-06-18', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(29, 10, 1, 15000, 15000, 7500, '2026-06-24 13:03:08.772909+00', '2026-06-19', 7500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(30, 6, 2, 5000, 10000, 3000, '2026-06-24 13:05:16.142513+00', '2026-06-19', 7000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(31, 7, 1, 7000, 7000, 2500, '2026-06-24 13:10:00.316373+00', '2026-06-20', 4500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(32, 5, 1, 8000, 8000, 4500, '2026-06-24 13:10:23.095503+00', '2026-06-20', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(33, 6, 1, 5000, 5000, 1500, '2026-06-24 13:15:20.633917+00', '2026-06-21', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(34, 8, 2, 10000, 20000, 10000, '2026-06-24 13:18:45.924828+00', '2026-06-21', 10000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(35, 6, 1, 5000, 5000, 1500, '2026-06-24 13:30:06.428732+00', '2026-06-22', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(36, 6, 1, 5000, 5000, 1500, '2026-06-24 13:30:23.959433+00', '2026-06-23', 3500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(37, 18, 1, 17000, 17000, 8500, '2026-06-24 13:47:40.40594+00', '2026-06-19', 8500, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(38, 19, 1, 6000, 6000, 3000, '2026-06-24 13:48:15.481033+00', '2026-06-20', 3000, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	(39, 19, 1, 5000, 5000, 2000, '2026-06-24 13:48:41.699426+00', '2026-06-21', 3000, '3804a347-60f3-415a-aff1-052ec4a6f461');


--
-- Data for Name: stock_adjustments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: stock_movements; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."stock_movements" ("id", "business_id", "product_id", "movement_type", "quantity", "reference_id", "notes", "created_by", "created_at") OVERRIDING SYSTEM VALUE VALUES
	(2, 'a08e3d86-7161-4e77-b708-b29dcad0a236', 7, 'sale', -2, NULL, NULL, 'fe8ea687-56f3-4196-a842-d6277d16b66e', '2026-05-28 12:47:15.752018+00'),
	(3, 'a08e3d86-7161-4e77-b708-b29dcad0a236', 1, 'sale', -1, NULL, NULL, 'fe8ea687-56f3-4196-a842-d6277d16b66e', '2026-05-28 12:48:20.165388+00'),
	(4, 'a08e3d86-7161-4e77-b708-b29dcad0a236', 7, 'purchase', 5, NULL, 'Purchase received', 'fe8ea687-56f3-4196-a842-d6277d16b66e', '2026-05-28 12:50:09.390131+00'),
	(5, 'a08e3d86-7161-4e77-b708-b29dcad0a236', 5, 'return', 1, '5', 'Rental returned', 'fe8ea687-56f3-4196-a842-d6277d16b66e', '2026-05-28 12:53:16.878444+00'),
	(6, '3804a347-60f3-415a-aff1-052ec4a6f461', 11, 'purchase', 1, NULL, 'Purchase received', '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-01 07:14:58.542199+00'),
	(7, '3804a347-60f3-415a-aff1-052ec4a6f461', 12, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-01 07:15:18.25996+00'),
	(8, '3804a347-60f3-415a-aff1-052ec4a6f461', 12, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-01 07:15:20.422955+00'),
	(9, '3804a347-60f3-415a-aff1-052ec4a6f461', 14, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-04 09:32:25.009829+00'),
	(10, '3804a347-60f3-415a-aff1-052ec4a6f461', 46, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:06:15.362824+00'),
	(11, '3804a347-60f3-415a-aff1-052ec4a6f461', 111, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:08:29.08575+00'),
	(12, '3804a347-60f3-415a-aff1-052ec4a6f461', 24, 'sale', -3, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:11:22.069121+00'),
	(13, '3804a347-60f3-415a-aff1-052ec4a6f461', 72, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:12:08.306271+00'),
	(14, '3804a347-60f3-415a-aff1-052ec4a6f461', 96, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:13:02.712666+00'),
	(15, '3804a347-60f3-415a-aff1-052ec4a6f461', 60, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:13:32.92338+00'),
	(16, '3804a347-60f3-415a-aff1-052ec4a6f461', 83, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:14:10.184614+00'),
	(17, '3804a347-60f3-415a-aff1-052ec4a6f461', 271, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:15:56.879731+00'),
	(18, '3804a347-60f3-415a-aff1-052ec4a6f461', 95, 'sale', -3, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:16:54.674043+00'),
	(19, '3804a347-60f3-415a-aff1-052ec4a6f461', 98, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:17:22.306462+00'),
	(20, '3804a347-60f3-415a-aff1-052ec4a6f461', 102, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:17:47.609175+00'),
	(21, '3804a347-60f3-415a-aff1-052ec4a6f461', 121, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:19:34.903309+00'),
	(22, '3804a347-60f3-415a-aff1-052ec4a6f461', 134, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:20:04.648663+00'),
	(23, '3804a347-60f3-415a-aff1-052ec4a6f461', 95, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:22:02.879601+00'),
	(24, '3804a347-60f3-415a-aff1-052ec4a6f461', 184, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:23:21.394122+00'),
	(25, '3804a347-60f3-415a-aff1-052ec4a6f461', 183, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:24:11.969477+00'),
	(26, '3804a347-60f3-415a-aff1-052ec4a6f461', 111, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:24:30.795794+00'),
	(27, '3804a347-60f3-415a-aff1-052ec4a6f461', 53, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:24:54.476337+00'),
	(28, '3804a347-60f3-415a-aff1-052ec4a6f461', 51, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:25:24.117904+00'),
	(29, '3804a347-60f3-415a-aff1-052ec4a6f461', 116, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:25:59.311967+00'),
	(30, '3804a347-60f3-415a-aff1-052ec4a6f461', 198, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:27:22.5694+00'),
	(31, '3804a347-60f3-415a-aff1-052ec4a6f461', 257, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:27:46.467788+00'),
	(32, '3804a347-60f3-415a-aff1-052ec4a6f461', 269, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:30:06.781234+00'),
	(33, '3804a347-60f3-415a-aff1-052ec4a6f461', 43, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:30:44.506667+00'),
	(34, '3804a347-60f3-415a-aff1-052ec4a6f461', 111, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:31:00.126067+00'),
	(35, '3804a347-60f3-415a-aff1-052ec4a6f461', 45, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:31:58.005107+00'),
	(36, '3804a347-60f3-415a-aff1-052ec4a6f461', 190, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:46:50.32259+00'),
	(37, '3804a347-60f3-415a-aff1-052ec4a6f461', 189, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:47:51.364101+00'),
	(38, '3804a347-60f3-415a-aff1-052ec4a6f461', 282, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 09:50:08.981542+00'),
	(39, '3804a347-60f3-415a-aff1-052ec4a6f461', 283, 'purchase', 6, NULL, 'Purchase received', '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 10:10:21.615847+00'),
	(40, '3804a347-60f3-415a-aff1-052ec4a6f461', 284, 'purchase', 1, NULL, 'Purchase received', '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-05 10:10:55.599893+00'),
	(41, '3804a347-60f3-415a-aff1-052ec4a6f461', 280, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-06 14:45:47.598617+00'),
	(42, '3804a347-60f3-415a-aff1-052ec4a6f461', 281, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-06 14:57:04.473164+00'),
	(43, '3804a347-60f3-415a-aff1-052ec4a6f461', 29, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:12:22.337365+00'),
	(44, '3804a347-60f3-415a-aff1-052ec4a6f461', 111, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:13:05.686216+00'),
	(45, '3804a347-60f3-415a-aff1-052ec4a6f461', 49, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:13:32.632219+00'),
	(46, '3804a347-60f3-415a-aff1-052ec4a6f461', 260, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:18:06.143841+00'),
	(47, '3804a347-60f3-415a-aff1-052ec4a6f461', 190, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:19:12.690108+00'),
	(48, '3804a347-60f3-415a-aff1-052ec4a6f461', 193, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:27:37.176764+00'),
	(49, '3804a347-60f3-415a-aff1-052ec4a6f461', 198, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:28:53.587132+00'),
	(50, '3804a347-60f3-415a-aff1-052ec4a6f461', 127, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:29:18.788881+00'),
	(51, '3804a347-60f3-415a-aff1-052ec4a6f461', 210, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:29:56.592473+00'),
	(52, '3804a347-60f3-415a-aff1-052ec4a6f461', 222, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:30:20.926708+00'),
	(53, '3804a347-60f3-415a-aff1-052ec4a6f461', 222, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:32:37.522106+00'),
	(54, '3804a347-60f3-415a-aff1-052ec4a6f461', 87, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:33:51.908206+00'),
	(55, '3804a347-60f3-415a-aff1-052ec4a6f461', 97, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:57:10.562441+00'),
	(56, '3804a347-60f3-415a-aff1-052ec4a6f461', 134, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:57:26.529034+00'),
	(57, '3804a347-60f3-415a-aff1-052ec4a6f461', 64, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:57:46.489432+00'),
	(58, '3804a347-60f3-415a-aff1-052ec4a6f461', 126, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:58:02.903832+00'),
	(59, '3804a347-60f3-415a-aff1-052ec4a6f461', 275, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 07:59:44.532094+00'),
	(60, '3804a347-60f3-415a-aff1-052ec4a6f461', 193, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:09:22.499233+00'),
	(61, '3804a347-60f3-415a-aff1-052ec4a6f461', 194, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:11:38.37095+00'),
	(62, '3804a347-60f3-415a-aff1-052ec4a6f461', 186, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:13:44.866095+00'),
	(63, '3804a347-60f3-415a-aff1-052ec4a6f461', 214, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:16:36.161022+00'),
	(64, '3804a347-60f3-415a-aff1-052ec4a6f461', 160, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:16:53.140819+00'),
	(65, '3804a347-60f3-415a-aff1-052ec4a6f461', 222, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:17:15.909928+00'),
	(66, '3804a347-60f3-415a-aff1-052ec4a6f461', 24, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:17:28.876256+00'),
	(67, '3804a347-60f3-415a-aff1-052ec4a6f461', 180, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:18:07.269176+00'),
	(68, '3804a347-60f3-415a-aff1-052ec4a6f461', 61, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:18:39.362519+00'),
	(69, '3804a347-60f3-415a-aff1-052ec4a6f461', 184, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:21:24.306918+00'),
	(70, '3804a347-60f3-415a-aff1-052ec4a6f461', 122, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:23:35.84437+00'),
	(71, '3804a347-60f3-415a-aff1-052ec4a6f461', 185, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:24:38.766216+00'),
	(72, '3804a347-60f3-415a-aff1-052ec4a6f461', 201, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:26:00.205808+00'),
	(73, '3804a347-60f3-415a-aff1-052ec4a6f461', 173, 'sale', -3, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:27:57.972604+00'),
	(74, '3804a347-60f3-415a-aff1-052ec4a6f461', 194, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:28:38.581246+00'),
	(75, '3804a347-60f3-415a-aff1-052ec4a6f461', 269, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:29:32.152274+00'),
	(76, '3804a347-60f3-415a-aff1-052ec4a6f461', 214, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:32:52.718183+00'),
	(77, '3804a347-60f3-415a-aff1-052ec4a6f461', 222, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:34:14.14554+00'),
	(78, '3804a347-60f3-415a-aff1-052ec4a6f461', 180, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:34:35.652048+00'),
	(79, '3804a347-60f3-415a-aff1-052ec4a6f461', 134, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:34:58.847628+00'),
	(80, '3804a347-60f3-415a-aff1-052ec4a6f461', 85, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:35:13.889407+00'),
	(81, '3804a347-60f3-415a-aff1-052ec4a6f461', 154, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:36:49.143792+00'),
	(82, '3804a347-60f3-415a-aff1-052ec4a6f461', 201, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:40:22.196982+00'),
	(83, '3804a347-60f3-415a-aff1-052ec4a6f461', 271, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:41:11.453271+00'),
	(84, '3804a347-60f3-415a-aff1-052ec4a6f461', 269, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:41:38.37404+00'),
	(85, '3804a347-60f3-415a-aff1-052ec4a6f461', 189, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:43:49.350598+00'),
	(86, '3804a347-60f3-415a-aff1-052ec4a6f461', 70, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:48:03.647759+00'),
	(87, '3804a347-60f3-415a-aff1-052ec4a6f461', 181, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:48:44.130063+00'),
	(88, '3804a347-60f3-415a-aff1-052ec4a6f461', 171, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:49:18.971571+00'),
	(89, '3804a347-60f3-415a-aff1-052ec4a6f461', 185, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:52:43.12463+00'),
	(90, '3804a347-60f3-415a-aff1-052ec4a6f461', 181, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:54:14.025627+00'),
	(91, '3804a347-60f3-415a-aff1-052ec4a6f461', 86, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:57:23.87469+00'),
	(92, '3804a347-60f3-415a-aff1-052ec4a6f461', 134, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:57:37.04458+00'),
	(93, '3804a347-60f3-415a-aff1-052ec4a6f461', 136, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:58:13.147654+00'),
	(94, '3804a347-60f3-415a-aff1-052ec4a6f461', 186, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 08:59:32.145663+00'),
	(95, '3804a347-60f3-415a-aff1-052ec4a6f461', 257, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-10 09:01:29.641024+00'),
	(96, '3804a347-60f3-415a-aff1-052ec4a6f461', 247, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:18:52.400627+00'),
	(97, '3804a347-60f3-415a-aff1-052ec4a6f461', 248, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:22:16.703174+00'),
	(98, '3804a347-60f3-415a-aff1-052ec4a6f461', 113, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:24:28.771607+00'),
	(99, '3804a347-60f3-415a-aff1-052ec4a6f461', 18, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:26:34.378533+00'),
	(100, '3804a347-60f3-415a-aff1-052ec4a6f461', 183, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:26:54.001663+00'),
	(101, '3804a347-60f3-415a-aff1-052ec4a6f461', 25, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:27:09.707226+00'),
	(102, '3804a347-60f3-415a-aff1-052ec4a6f461', 254, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:28:06.336173+00'),
	(103, '3804a347-60f3-415a-aff1-052ec4a6f461', 237, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:28:33.677342+00'),
	(104, '3804a347-60f3-415a-aff1-052ec4a6f461', 76, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:30:34.061422+00'),
	(105, '3804a347-60f3-415a-aff1-052ec4a6f461', 194, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:31:51.716118+00'),
	(106, '3804a347-60f3-415a-aff1-052ec4a6f461', 16, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:36:09.939325+00'),
	(107, '3804a347-60f3-415a-aff1-052ec4a6f461', 190, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:39:23.147163+00'),
	(108, '3804a347-60f3-415a-aff1-052ec4a6f461', 190, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:40:20.467057+00'),
	(109, '3804a347-60f3-415a-aff1-052ec4a6f461', 222, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:41:02.448199+00'),
	(110, '3804a347-60f3-415a-aff1-052ec4a6f461', 122, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:42:15.800653+00'),
	(111, '3804a347-60f3-415a-aff1-052ec4a6f461', 122, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:42:16.041224+00'),
	(112, '3804a347-60f3-415a-aff1-052ec4a6f461', 71, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:42:58.777995+00'),
	(113, '3804a347-60f3-415a-aff1-052ec4a6f461', 55, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:43:16.815504+00'),
	(114, '3804a347-60f3-415a-aff1-052ec4a6f461', 264, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:43:49.186745+00'),
	(115, '3804a347-60f3-415a-aff1-052ec4a6f461', 266, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:44:10.546753+00'),
	(116, '3804a347-60f3-415a-aff1-052ec4a6f461', 176, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:44:39.174839+00'),
	(117, '3804a347-60f3-415a-aff1-052ec4a6f461', 178, 'sale', -7, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:48:25.305253+00'),
	(118, '3804a347-60f3-415a-aff1-052ec4a6f461', 197, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:50:00.909556+00'),
	(119, '3804a347-60f3-415a-aff1-052ec4a6f461', 172, 'sale', -3, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:50:54.495723+00'),
	(120, '3804a347-60f3-415a-aff1-052ec4a6f461', 197, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:51:46.876224+00'),
	(121, '3804a347-60f3-415a-aff1-052ec4a6f461', 183, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:52:25.952421+00'),
	(122, '3804a347-60f3-415a-aff1-052ec4a6f461', 97, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:52:55.171076+00'),
	(123, '3804a347-60f3-415a-aff1-052ec4a6f461', 107, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:53:38.981882+00'),
	(124, '3804a347-60f3-415a-aff1-052ec4a6f461', 18, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:54:02.058226+00'),
	(125, '3804a347-60f3-415a-aff1-052ec4a6f461', 270, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:54:45.891453+00'),
	(126, '3804a347-60f3-415a-aff1-052ec4a6f461', 56, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:55:08.637236+00'),
	(127, '3804a347-60f3-415a-aff1-052ec4a6f461', 69, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:55:25.446904+00'),
	(128, '3804a347-60f3-415a-aff1-052ec4a6f461', 183, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:56:16.085558+00'),
	(129, '3804a347-60f3-415a-aff1-052ec4a6f461', 248, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:57:14.2133+00'),
	(130, '3804a347-60f3-415a-aff1-052ec4a6f461', 247, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:59:00.789523+00'),
	(131, '3804a347-60f3-415a-aff1-052ec4a6f461', 61, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:59:20.349109+00'),
	(132, '3804a347-60f3-415a-aff1-052ec4a6f461', 197, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 10:59:55.222844+00'),
	(133, '3804a347-60f3-415a-aff1-052ec4a6f461', 183, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:00:23.957841+00'),
	(134, '3804a347-60f3-415a-aff1-052ec4a6f461', 236, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:04:02.752689+00'),
	(135, '3804a347-60f3-415a-aff1-052ec4a6f461', 275, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:04:45.481635+00'),
	(136, '3804a347-60f3-415a-aff1-052ec4a6f461', 277, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:05:13.744329+00'),
	(137, '3804a347-60f3-415a-aff1-052ec4a6f461', 248, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:05:45.44751+00'),
	(138, '3804a347-60f3-415a-aff1-052ec4a6f461', 180, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:06:00.284716+00'),
	(139, '3804a347-60f3-415a-aff1-052ec4a6f461', 173, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:07:14.536757+00'),
	(140, '3804a347-60f3-415a-aff1-052ec4a6f461', 191, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:08:32.601012+00'),
	(141, '3804a347-60f3-415a-aff1-052ec4a6f461', 123, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:08:46.251784+00'),
	(142, '3804a347-60f3-415a-aff1-052ec4a6f461', 90, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:09:09.548582+00'),
	(143, '3804a347-60f3-415a-aff1-052ec4a6f461', 257, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:09:47.844714+00'),
	(144, '3804a347-60f3-415a-aff1-052ec4a6f461', 185, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:10:49.179758+00'),
	(145, '3804a347-60f3-415a-aff1-052ec4a6f461', 222, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-15 11:12:40.289399+00'),
	(146, '3804a347-60f3-415a-aff1-052ec4a6f461', 214, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:03:19.366185+00'),
	(147, '3804a347-60f3-415a-aff1-052ec4a6f461', 201, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:42:23.163594+00'),
	(148, '3804a347-60f3-415a-aff1-052ec4a6f461', 111, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:42:49.104574+00'),
	(149, '3804a347-60f3-415a-aff1-052ec4a6f461', 183, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:43:08.241477+00'),
	(150, '3804a347-60f3-415a-aff1-052ec4a6f461', 38, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:43:27.952925+00'),
	(151, '3804a347-60f3-415a-aff1-052ec4a6f461', 193, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:43:50.758992+00'),
	(152, '3804a347-60f3-415a-aff1-052ec4a6f461', 72, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:44:07.924032+00'),
	(153, '3804a347-60f3-415a-aff1-052ec4a6f461', 237, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:44:33.113282+00'),
	(154, '3804a347-60f3-415a-aff1-052ec4a6f461', 237, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:44:51.515823+00'),
	(155, '3804a347-60f3-415a-aff1-052ec4a6f461', 113, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:46:00.003055+00'),
	(156, '3804a347-60f3-415a-aff1-052ec4a6f461', 236, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:47:13.630559+00'),
	(157, '3804a347-60f3-415a-aff1-052ec4a6f461', 236, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:47:36.869455+00'),
	(158, '3804a347-60f3-415a-aff1-052ec4a6f461', 245, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:49:01.678129+00'),
	(159, '3804a347-60f3-415a-aff1-052ec4a6f461', 270, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:49:25.874886+00'),
	(160, '3804a347-60f3-415a-aff1-052ec4a6f461', 173, 'sale', -3, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:49:44.467249+00'),
	(161, '3804a347-60f3-415a-aff1-052ec4a6f461', 57, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:51:04.278566+00'),
	(162, '3804a347-60f3-415a-aff1-052ec4a6f461', 186, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:51:22.53522+00'),
	(163, '3804a347-60f3-415a-aff1-052ec4a6f461', 257, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:51:43.327288+00'),
	(164, '3804a347-60f3-415a-aff1-052ec4a6f461', 122, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:52:00.136242+00'),
	(165, '3804a347-60f3-415a-aff1-052ec4a6f461', 189, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:52:19.152696+00'),
	(166, '3804a347-60f3-415a-aff1-052ec4a6f461', 179, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:52:42.622855+00'),
	(167, '3804a347-60f3-415a-aff1-052ec4a6f461', 277, 'sale', -3, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:53:50.667476+00'),
	(168, '3804a347-60f3-415a-aff1-052ec4a6f461', 192, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:54:09.165199+00'),
	(169, '3804a347-60f3-415a-aff1-052ec4a6f461', 193, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:54:28.883228+00'),
	(170, '3804a347-60f3-415a-aff1-052ec4a6f461', 190, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:55:12.473247+00'),
	(171, '3804a347-60f3-415a-aff1-052ec4a6f461', 172, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:55:30.455477+00'),
	(172, '3804a347-60f3-415a-aff1-052ec4a6f461', 201, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:56:25.239717+00'),
	(173, '3804a347-60f3-415a-aff1-052ec4a6f461', 214, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:56:56.090742+00'),
	(174, '3804a347-60f3-415a-aff1-052ec4a6f461', 188, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:57:26.447275+00'),
	(175, '3804a347-60f3-415a-aff1-052ec4a6f461', 192, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:57:41.650605+00'),
	(176, '3804a347-60f3-415a-aff1-052ec4a6f461', 87, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:59:08.614717+00'),
	(177, '3804a347-60f3-415a-aff1-052ec4a6f461', 181, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 12:59:24.946179+00'),
	(178, '3804a347-60f3-415a-aff1-052ec4a6f461', 89, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:01:17.619172+00'),
	(179, '3804a347-60f3-415a-aff1-052ec4a6f461', 194, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:01:44.396667+00'),
	(180, '3804a347-60f3-415a-aff1-052ec4a6f461', 95, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:02:12.415843+00'),
	(181, '3804a347-60f3-415a-aff1-052ec4a6f461', 173, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:02:29.734639+00'),
	(182, '3804a347-60f3-415a-aff1-052ec4a6f461', 185, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:03:50.498822+00'),
	(183, '3804a347-60f3-415a-aff1-052ec4a6f461', 22, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:04:04.073881+00'),
	(184, '3804a347-60f3-415a-aff1-052ec4a6f461', 23, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:04:19.490878+00'),
	(185, '3804a347-60f3-415a-aff1-052ec4a6f461', 23, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:04:19.780534+00'),
	(186, '3804a347-60f3-415a-aff1-052ec4a6f461', 111, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:04:37.085062+00'),
	(187, '3804a347-60f3-415a-aff1-052ec4a6f461', 275, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:07:02.785436+00'),
	(188, '3804a347-60f3-415a-aff1-052ec4a6f461', 260, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:07:18.386388+00'),
	(189, '3804a347-60f3-415a-aff1-052ec4a6f461', 69, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:07:32.622289+00'),
	(190, '3804a347-60f3-415a-aff1-052ec4a6f461', 97, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:07:50.529654+00'),
	(191, '3804a347-60f3-415a-aff1-052ec4a6f461', 65, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:08:20.274844+00'),
	(192, '3804a347-60f3-415a-aff1-052ec4a6f461', 173, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:08:43.21052+00'),
	(193, '3804a347-60f3-415a-aff1-052ec4a6f461', 194, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:09:37.557522+00'),
	(194, '3804a347-60f3-415a-aff1-052ec4a6f461', 193, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:10:48.973828+00'),
	(195, '3804a347-60f3-415a-aff1-052ec4a6f461', 169, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:11:08.523488+00'),
	(196, '3804a347-60f3-415a-aff1-052ec4a6f461', 183, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:11:29.400089+00'),
	(197, '3804a347-60f3-415a-aff1-052ec4a6f461', 111, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:11:47.183709+00'),
	(198, '3804a347-60f3-415a-aff1-052ec4a6f461', 95, 'sale', -2, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:12:11.842909+00'),
	(199, '3804a347-60f3-415a-aff1-052ec4a6f461', 179, 'sale', -4, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:16:12.216806+00'),
	(200, '3804a347-60f3-415a-aff1-052ec4a6f461', 271, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:17:40.577293+00'),
	(201, '3804a347-60f3-415a-aff1-052ec4a6f461', 194, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:18:31.456604+00'),
	(202, '3804a347-60f3-415a-aff1-052ec4a6f461', 186, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:19:24.585445+00'),
	(203, '3804a347-60f3-415a-aff1-052ec4a6f461', 33, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:21:14.776384+00'),
	(204, '3804a347-60f3-415a-aff1-052ec4a6f461', 190, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:21:54.493176+00'),
	(205, '3804a347-60f3-415a-aff1-052ec4a6f461', 122, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:22:12.382403+00'),
	(206, '3804a347-60f3-415a-aff1-052ec4a6f461', 90, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:29:39.533503+00'),
	(207, '3804a347-60f3-415a-aff1-052ec4a6f461', 183, 'sale', -1, NULL, NULL, '7af3a293-bf1f-40c7-925e-683ff23d9fe3', '2026-06-24 13:30:48.826673+00');


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_profiles" ("id", "username", "full_name", "role", "created_at", "active", "business_id") VALUES
	('c5616835-075b-4d50-b424-1282df4c4855', 'staff', 'Attendant', 'staff', '2026-05-22 12:37:12.468464+00', true, 'a08e3d86-7161-4e77-b708-b29dcad0a236'),
	('fe8ea687-56f3-4196-a842-d6277d16b66e', 'admin', 'Administrator', 'admin', '2026-05-22 09:51:45.712013+00', true, 'a08e3d86-7161-4e77-b708-b29dcad0a236'),
	('7af3a293-bf1f-40c7-925e-683ff23d9fe3', 'adminb', 'BeautyBliss Admin', 'admin', '2026-05-30 09:36:14.760218+00', true, '3804a347-60f3-415a-aff1-052ec4a6f461'),
	('6b68c38a-b9b7-4c92-8600-1c28beb68691', 'staffb', 'Shop Attendant', 'staff', '2026-06-01 10:56:10.627793+00', true, '3804a347-60f3-415a-aff1-052ec4a6f461');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('logos', 'logos', NULL, '2026-05-28 14:39:54.977948+00', '2026-05-28 14:39:54.977948+00', true, false, NULL, NULL, NULL, 'STANDARD'),
	('backups', 'backups', NULL, '2026-06-01 14:12:21.22134+00', '2026-06-01 14:12:21.22134+00', false, false, NULL, NULL, NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('2007b9c6-e27c-4667-9870-bd936956878f', 'logos', '.emptyFolderPlaceholder', NULL, '2026-05-29 07:18:51.573966+00', '2026-05-29 07:18:51.573966+00', '2026-05-29 07:18:51.573966+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2026-05-29T07:18:51.573Z", "contentLength": 0, "httpStatusCode": 200}', '49b5b683-d850-485e-a13f-8d8c2feddeaa', NULL, '{}'),
	('346e0933-e877-43ae-8a3f-28c389cc4997', 'logos', 'kaitu.png', NULL, '2026-05-29 08:27:00.464294+00', '2026-05-29 08:27:00.464294+00', '2026-05-29 08:27:00.464294+00', '{"eTag": "\"3af53c7e4544f6b4d57d6c2e530b5db9-1\"", "size": 93759, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-29T08:27:01.000Z", "contentLength": 93759, "httpStatusCode": 200}', 'cbeb7473-7555-46ed-9fa4-9be5983382df', NULL, NULL),
	('644f8743-3196-48be-aa69-900cae0a1926', 'logos', 'Bbliss.png', NULL, '2026-06-01 10:39:53.554312+00', '2026-06-01 10:39:53.554312+00', '2026-06-01 10:39:53.554312+00', '{"eTag": "\"fd59e98b69ed9f8a0f8e527db566c8b3-1\"", "size": 95020, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-01T10:39:54.000Z", "contentLength": 95020, "httpStatusCode": 200}', '25121520-0ae2-4e25-876e-4adcd28d9b2c', NULL, NULL);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 213, true);


--
-- Name: audit_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."audit_logs_id_seq"', 293, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."categories_id_seq"', 21, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."customers_id_seq"', 5, true);


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."expenses_id_seq"', 11, true);


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."permissions_id_seq"', 4, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."products_id_seq"', 284, true);


--
-- Name: purchases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."purchases_id_seq"', 11, true);


--
-- Name: rentals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."rentals_id_seq"', 6, true);


--
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."sales_id_seq"', 209, true);


--
-- Name: service_sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."service_sales_id_seq"', 39, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."services_id_seq"', 19, true);


--
-- Name: stock_adjustments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."stock_adjustments_id_seq"', 4, true);


--
-- Name: stock_movements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."stock_movements_id_seq"', 207, true);


--
-- Name: units_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."units_id_seq"', 23, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict IbCZadyDp4eJEtFG5f39oarpPvLRQEd9uMLMBRZbGTYosEsvfzFql7PDgeuJLyw

RESET ALL;
