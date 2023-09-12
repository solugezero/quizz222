<script setup></script>

<template>
	<span class="spinner-section-far"></span>
</template>

<style lang="scss" scoped>
$inactive: #dfe6eb;
$active: #0d91ec;
$speed: 1.2s;
$size: 40px;
$unit: calc($size / 16);

%spinner {
	display: block;
	float: left;
	width: $size;
	height: $size;
	border-radius: 50%;
	border: $unit solid $inactive;
	animation: spinner $speed linear infinite;
}
@keyframes spinner {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}

/* Sections */
%spinner-double-section,
.spinner-double-section {
	@extend %spinner;
	position: relative;

	&:before,
	&:after {
		content: "";
		position: absolute;
		top: -$unit;
		left: -$unit;
		display: block;
		width: $size;
		height: $size;
		border-radius: 50%;
		border: $unit solid transparent;
		border-top-color: $active;
	}
	&:after {
		border-top-color: transparent;
		border-bottom-color: $active;
	}
}

%spinner-double-section-far,
.spinner-double-section-far {
	@extend %spinner-double-section;

	&:before,
	&:after {
		top: ($unit * -3);
		left: ($unit * -3);
		width: ($size + $unit * 4);
		height: ($size + $unit * 4);
	}
}
%spinner-section-far,
.spinner-section-far {
	@extend %spinner-double-section-far;

	&:after {
		display: none;
	}
}
</style>
