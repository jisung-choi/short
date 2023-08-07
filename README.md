# Tiny URL Project
### DEMO: https://jisung-choi.github.io/short/

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [System Design Overview](#system-design-overview)

## Overview

This portfolio project empowers users to generate shortened URLs for seamless and efficient redirection.

## Built With

- Java, Typescript, Express.js, Angular, SpringBoot, MongoDB
- PrimeNG(front-end library)

## System Design Overview
This section provides an overview of the system design employed within this project.

### Pre-generated Keys
**Functionality**

The system employs a pre-generated keys mechanism, wherein the database stores a repository of over one million unique keys, created offline. These keys facilitate swift generation of shortened URls, ensuring both efficient redirection and the preservation of URL uniqueness.

**Rationale**

The utilization of encoding or hashing techniques, such as MD5 or SHA256, to generate shortened URLs can lead to unwieldy and lengthy URLs. Moreover, the adoption of such methods may result in non-unique shortened URLs when multiple users input the same URL. The preemptive generation of keys mitigates both of these concerns effectively.

However, this approach presents two noteworthy considerations: database storage and the finite availability of pre-generated keys.

The allocation of database storage to accommodate pre-generated keys becomes a pivotal constraint. For this endeavor, the project has adhered to a self-imposed limitation of one million pre-generated keys, aligning with the storage parameters of MongoDB's free tier.

Addressing the potential exhaustion of pre-generated keys is a nuanced task. To circumvent this challenge, the system incorporates a strategy involving the reuse of Tiny URLs with expired time-to-live (TTL) values.

### Database cleanup
**Functionality**

Incorporates regular database cleanup. These procedures systematically verify the TTL status of used Tiny URLs, leading to the elimination of obsolete data and enabling these Tiny URLs for subsequent use.

**Rationale**

Two distinct methodologies exist for database cleanup: a regular cleanup approach and a more passive "lazy" cleanup method. The latter entails the removal of expired Tiny URLs only when user attempts to access Tiny beyond their TTL. The lazy cleanup technique is advantageous in that it avoids imposing a recurring database iteration overhead, circumventing the need for regular sweeps and deletions. This method is suitable when the database holds an ample surplus of Tiny URLs, negating concerns about reusability.

Conversely, this project has adopted a strategy of regular database cleanup, informed by the relatively modest quantity of 'Tiny' URLs (approximately one million) and the imperative to recycle expired Tiny URLs. It is worth noting that this approach does entail the drawback of exerting a recurring burden on the database infrastructure, as alluded to above.





